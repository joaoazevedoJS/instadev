// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

import SendMail from '../utils/SendMail'
import nowDateUTC from '../utils/NowDateUTC'

class WebAuthController {
  authenticated (req: Request, res: Response) {
    // if token is true
    res.send('')
  }

  async confirmAccount (req: Request, res: Response) {
    const { userId } = req.userSession
    const { code } = req.params

    const account = await knex('users')
      .select('accountCode')
      .select('confirmAccount')
      .where('id', userId).first()

    if (code !== account.accountCode) return res.status(401).json({ error: 'Code Not Exists' })

    if (account.confirmAccount) return res.status(409).json({ error: 'Email has already been verified' })

    await knex('users')
      .where('id', userId)
      .update('confirmAccount', true)

    return res.send('')
  }

  async resendCode (req: Request, res: Response) {
    const { userId } = req.userSession

    const user = await knex('users')
      .where('id', userId).first()

    const date = new Date()

    user.password = undefined

    if (user.confirmAccount) return res.status(409).json({ error: 'Email has already been verified' })

    const trx = await knex.transaction()

    if (user.limit_resend === 3) {
      const dateUTC = nowDateUTC(3)

      await trx('users')
        .where('id', userId)
        .update('limit_date_resend', dateUTC)
    }

    if (user.limit_resend > 3) {
      if (new Date(Date.parse(user.limit_date_resend)) < date) {
        await trx('users')
          .where('id', userId)
          .update('limit_resend', 0)
      } else {
        trx.rollback()
        return res.status(401).json({ error: 'Limit Resend Mail' })
      }
    }

    try {
      await SendMail(
        user.email,
        'no-reply@mail.instadev.com',
        'confirm_account',
        { email: user.email, accountCode: user.accountCode }
      )

      await trx('users')
        .where('id', userId)
        .update('limit_resend', Number(user.limit_resend) + 1)

      await trx.commit()

      res.json({ sucess: 'Email been send' })
    } catch (error) {
      res.status(500).json({ error: 'Error, try again' })
    }
  }
}

export default WebAuthController

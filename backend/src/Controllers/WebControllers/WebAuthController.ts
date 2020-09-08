// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'
import ConfirmAccountModel from '../../model/UsersModel/ConfirmAccountModel'
import ResendCodeModel from '../../model/UsersModel/ResendCodeModel'

import UserError from '../../errors/UserError'

import SendMail from '../../utils/SendMail'

class WebAuthController {
  authenticated (req: Request, res: Response) {
    // if token is true
    res.send('')
  }

  async confirmAccount (req: Request, res: Response) {
    const { userId } = req.userSession
    const { code } = req.params

    const { GetAccount, UpdateAccount } = new ConfirmAccountModel()
    const { errorCodeNotExists, errorMailAlreadyVerified, errorUserUpdate } = new UserError()

    const account = await GetAccount(userId)

    if (code !== account.code) return res.status(errorCodeNotExists.status).json(errorCodeNotExists)

    if (account.confirm_account) return res.status(errorMailAlreadyVerified.status).json(errorMailAlreadyVerified)

    try {
      await UpdateAccount(userId)

      return res.send('')
    } catch (e) {
      return res.status(errorUserUpdate.status).json(errorUserUpdate)
    }
  }

  async resendCode (req: Request, res: Response) {
    const { userId } = req.userSession

    const { GetAccount, Update_LimiteResend, Update_LimiteData } = new ResendCodeModel()
    const { errorMailAlreadyVerified } = new UserError()

    const user = await GetAccount(userId)

    if (user.confirmAccount) return res.status(errorMailAlreadyVerified.status).json(errorMailAlreadyVerified)

    if (user.limit_date_resend) {
      const dateParse = new Date(Date.parse(user.limit_date_resend))
      const date = new Date()

      if (dateParse < date) {
        await Update_LimiteResend(userId)
      } else {
        return res.status(401).json({ error: 'Limit Resend Mail' })
      }
    }

    if (user.limit_resend === 3) {
      await Update_LimiteData(userId)
    }

    try {
      await SendMail(
        user.email,
        'no-reply@mail.instadev.com',
        'confirm_account',
        { email: user.email, accountCode: user.accountCode }
      )

      const limit = await knex('users')
        .select('limit_resend')
        .where('id', userId).first()

      await knex('users')
        .where('id', userId)
        .update('limit_resend', Number(limit.limit_resend) + 1)

      res.json({ sucess: 'Email been send' })
    } catch (error) {
      res.status(500).json({ error: 'Error, try again' })
    }
  }
}

export default WebAuthController

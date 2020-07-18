// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

class VerifyAccountController {
  async verifyEmail (req: Request, res: Response) {
    const { email } = req.body

    const mailExists = await knex('users')
      .select('email')
      .where('email', String(email)).first()

    mailExists ? res.json({ exists: true })
      : res.json({ exists: false })
  }

  async verifyUserName (req: Request, res: Response) {
    // eslint-disable-next-line camelcase
    const { user_name } = req.body

    const parts = String(user_name).split(' ')

    if (parts.length !== 1) return res.json({ error: 'User name Malformed' })

    const userNameExists = await knex('users')
      .select('user_name')
      .where('user_name', String(user_name)).first()

    userNameExists ? res.json({ exists: true })
      : res.json({ exists: false })
  }
}

export default VerifyAccountController

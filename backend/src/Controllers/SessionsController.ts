// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import bycript from 'bcryptjs'

import GenerateToken from '../utils/GenerateToken'
import knex from '../database/connection'
import mailer from '../smtp/mailer'

interface Options {
  template: string
}

class SessionsController {
  async signup (req: Request, res: Response) {
    // eslint-disable-next-line camelcase
    const { email, user_name, name, password } = req.body

    const ExistsAccount = await knex('users')
      .where('email', String(email))
      .orWhere('user_name', String(user_name)).first()

    if (ExistsAccount) return res.status(409).json({ error: 'Account Exists, try again' })

    try {
      const hash = await bycript.hash(password, 10)

      const userDate = {
        email,
        user_name,
        name,
        password: hash,
        confirmAccount: false
      }

      const [id] = await knex('users').insert(userDate)

      userDate.password = undefined

      mailer.sendMail({
        to: email,
        from: 'emailTest@Mailfake.com',
        template: 'confirm_account'
      })

      res.json({ id, ...userDate })
    } catch (e) {
      return res.status(406).json({ error: 'Failed to register new user!' })
    }
  }

  async signin (req: Request, res: Response) {
    const { email, password } = req.body

    const user = await knex('users')
      .where('email', email).first()

    if (!user) return res.status(404).json({ error: 'User not Found' })

    const verifyPassword = await bycript.compare(password, user.password)

    if (!verifyPassword) return res.status(401).json({ error: 'Invalid password, try again!' })

    const token = GenerateToken(user.id)

    return res.json({ token })
  }
}

export default SessionsController

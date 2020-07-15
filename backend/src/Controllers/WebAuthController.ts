// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

class WebAuthController {
  authenticated (req: Request, res: Response) {
    // if token is true
    res.send('')
  }

  async confirmAccount (req: Request, res: Response) {
    const { userId } = req.userSession

    const { confirmAccount } = await knex('users')
      .select('confirmAccount')
      .where('id', userId).first()

    if (!!confirmAccount === false) return res.status(401).json({ error: 'Email not Verified' })

    return res.send('')
  }
}

export default WebAuthController

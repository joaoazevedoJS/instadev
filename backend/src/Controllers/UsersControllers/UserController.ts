// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class UserController {
  async show (req: Request, res: Response) {
    // it get id in URLDashboard.ts
    const { id } = req.params

    const [following] = await knex('following')
      .where('user_id', id).count()

    const [followers] = await knex('following')
      .where('following_id', id).count()

    const [publications] = await knex('publications')
      .where('user_id', id).count()

    const user = await knex('users')
      .select('name')
      .select('user_name')
      .select('privateAccount')
      .where('id', id).first()

    res.header({
      'X-Total-Following': following['count(*)'],
      'X-Total-Followers': followers['count(*)'],
      'X-Total-Publications': publications['count(*)']
    })

    return res.json(user)
  }

  async sql (req: Request, res: Response) {
    const users = await knex('users')

    return res.json(users)
  }

  async update (req: Request, res: Response) {
    const { userId } = req.userSession
    const { privateAccount } = req.body

    try {
      await knex('users')
        .where('id', userId)
        .update('privateAccount', Boolean(privateAccount))

      return res.send()
    } catch (e) {
      return res.status(500).json({ error: 'Error, try again!' })
    }
  }
}

export default UserController

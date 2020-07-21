// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

class UserController {
  async show (req: Request, res: Response) {
    // it get id in URLDashboard.ts
    const { id } = req.params

    const [following] = await knex('following')
      .where('user_id', id).count()

    const [Followers] = await knex('following')
      .where('following_id', id).count()

    const [publications] = await knex('publications')
      .where('user_id', id).count()

    const user = await knex('users')
      .select('name')
      .select('user_name')
      .where('id', id).first()

    res.header({
      'X-Total-Following': following['count(*)'],
      'X-Total-Followers': Followers['count(*)'],
      'X-Total-Publications': publications['count(*)']
    })

    return res.json(user)
  }
}

export default UserController

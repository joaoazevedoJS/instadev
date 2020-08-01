// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class FollowersController {
  async index (req: Request, res: Response) {
    const { id } = req.params
    let { order, page } = req.query

    if (order !== 'desc' && order !== 'asc') {
      order = 'asc'
    }

    const followers = await knex('following')
      .where('following_id', id).orderBy('id', order)
      .limit(10)
      .offset((Number(page) - 1) * 10)
      .select([
        'id',
        'following_id as user_id',
        'user_id as followers_id'
      ])

    return res.json(followers)
  }
}

export default FollowersController

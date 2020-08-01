// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class HomePublicationsController {
  async index (req: Request, res: Response) {
    const { userId } = req.userSession
    const { page } = req.query

    const publications = await knex('publications')
      .join('users', 'users.id', '=', 'publications.user_id')
      .join('following', 'following.following_id', '=', 'publications.user_id')
      .leftJoin('public_likes', 'public_likes.publication_id', '=', 'publications.id')
      .where('following.user_id', Number(userId))
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .orderBy('publications.date', 'desc')
      .count('public_likes.publication_id', { as: 'likes' })
      .limit(20)
      .offset((Number(page) - 1) * 20)

    res.json(publications)
  }
}

export default HomePublicationsController

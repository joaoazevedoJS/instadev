// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

class GlobalPublicationsController {
  async index (req: Request, res: Response) {
    const { page } = req.query

    const publications = await knex('publications')
      .join('users', 'users.id', '=', 'publications.user_id')
      .leftJoin('public_likes', 'public_likes.publication_id', '=', 'publications.id')
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .count('public_likes.publication_id', { as: 'likes' })
      .orderBy('likes', 'desc')
      .orderBy('publications.date', 'desc')
      .limit(20)
      .offset((Number(page) - 1) * 20)

    res.json(publications)
  }
}

export default GlobalPublicationsController

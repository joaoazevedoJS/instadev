// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

class PublicationsController {
  async index (req: Request, res: Response) {
    const { id } = req.params
    const { page } = req.query

    const publications = await knex('publications')
      .where('user_id', id)
      .limit(20)
      .offset((Number(page) - 1) * 20)

    return res.json(publications)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { legend } = req.body

    const data = {
      photo: 'tempImage.jpg',
      legend,
      date: new Date(),
      user_id: userId
    }

    const [id] = await knex('publications').insert(data)

    return res.json({ id, ...data })
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { PublicationId } = req.params

    const data = {
      id: PublicationId,
      user_id: userId
    }

    await knex('publications')
      .where(data).first().delete()

    return res.send('')
  }
}

export default PublicationsController

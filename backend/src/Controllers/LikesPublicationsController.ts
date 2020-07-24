// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'
import UpdateLike from '../utils/UpdateLike'

// Proximo dia - Criar Banco de dados N-N, fazer indice de quais publicações o usuario curtio, etc
class LikesPublicationsController {
  async index (req: Request, res: Response) {
    const { PublicationId } = req.params

    const likes = await knex('public_likes')
      .where('publication_id', PublicationId)

    return res.json(likes)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { PublicationId } = req.params

    const data = {
      user_id: Number(userId),
      publication_id: Number(PublicationId)
    }

    const AlreadyLiked = await knex('public_likes')
      .where(data).first()

    if (AlreadyLiked) return res.status(401).json({ error: 'you can\'t liked again' })

    try {
      const [id] = await knex('public_likes').insert(data)

      await UpdateLike(Number(PublicationId))

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { PublicationId } = req.params

    const data = {
      user_id: Number(userId),
      publication_id: Number(PublicationId)
    }

    try {
      await knex('public_likes')
        .where(data).first().delete()

      await UpdateLike(Number(PublicationId))

      return res.send('')
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }
}

export default LikesPublicationsController

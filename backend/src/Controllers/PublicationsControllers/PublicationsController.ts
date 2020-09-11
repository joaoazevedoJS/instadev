// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import nowDateUTC from '../../utils/NowDateUTC'

import PublicationsErrors from '../../errors/PublicationsErrors'
import PublicationsModel from '../../model/PublicationsModel/PublicationsModel'

class PublicationsController {
  async index (req: Request, res: Response) {
    const { id } = req.params
    const { page } = req.query

    const { ReadUserPublication } = new PublicationsModel()

    const publications = await ReadUserPublication(Number(id), Number(page))

    return res.json(publications)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { legend } = req.body

    const date = nowDateUTC()

    const data = {
      photo: 'tempImage.jpg',
      legend,
      date,
      user_id: userId
    }

    const { CreateUserPublication } = new PublicationsModel()

    try {
      const [id] = await CreateUserPublication(data)

      return res.status(201).json({ id, ...data })
    } catch (e) {
      const { errorInCreatePublication } = new PublicationsErrors()

      return res.status(errorInCreatePublication.status).json(errorInCreatePublication)
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { PublicationId } = req.params

    const data = {
      id: Number(PublicationId),
      user_id: Number(userId)
    }

    const { DeleteUserPublication } = new PublicationsModel()

    try {
      const unexpectedError: any = await DeleteUserPublication(data)

      if (unexpectedError.status) {
        return res.status(unexpectedError.status).json(unexpectedError)
      }

      return res.send('')
    } catch (e) {
      const { errorInDeletePublication } = new PublicationsErrors()

      return res.status(errorInDeletePublication.status).json(errorInDeletePublication)
    }
  }

  async update (req: Request, res: Response) {
    const { userId } = req.userSession

    return res.json({ message: 'Hello World!', userId })
  }
}

export default new PublicationsController()

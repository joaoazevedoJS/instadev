// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import nowDateUTC from '../../utils/NowDateUTC'

import PublicationsErrors from '../../errors/PublicationsErrors'
import PublicationsModel from '../../model/PublicationsModel'

class PublicationsController extends PublicationsModel {
  async index (req: Request, res: Response) {
    const { id } = req.params
    const { page } = req.query

    const publications = await super.ReadUserPublication(Number(id), Number(page))

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

    try {
      const [id] = await super.CreateUserPublication(data)

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

    try {
      const unexpectedError: any = await super.DeleteUserPublication(data)

      if (unexpectedError.status) {
        return res.status(unexpectedError.status).json(unexpectedError)
      }

      return res.send('')
    } catch (e) {
      const { errorInDeletePublication } = new PublicationsErrors()

      return res.status(errorInDeletePublication.status).json(errorInDeletePublication)
    }
  }
}

export default PublicationsController

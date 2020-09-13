import { Request, Response } from 'express'

import nowDateUTC from '../../utils/NowDateUTC'

import PublicationsErrors from '../../errors/PublicationsErrors'
import PublicationsModel from '../../model/PublicationsModel/PublicationsModel'
import SearchPublicationsModel from '../../model/PublicationsModel/SearchPublicationsModel'

class PublicationsController {
  private _model = new PublicationsModel()
  private _searchPublicationModel = (page: number, order?: string) => new SearchPublicationsModel(page, order)
  private _error = (response: Response) => new PublicationsErrors(response)

  public index = async (req: Request, res: Response) => {
    const { id } = req.params
    const { page, order } = req.query

    const model = this._searchPublicationModel(Number(page), String(order))

    const publications = await model.UserPublications(Number(id))

    return res.json(publications)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { description } = req.body

    const error = this._error(res)

    const data = this.FactoryCreatePublication(description, userId)

    try {
      const id = await this._model.CreateUserPublication(data)

      return res.status(201).json({ id, ...data })
    } catch (e) {
      return error.createPublication(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { PublicationId } = req.params

    const error = this._error(res)

    const where = { id: Number(PublicationId), user_id: Number(userId) }

    const publication = await this._model.SearchPublication(where)

    if (!publication) return error.publicationNotFound()

    try {
      await this._model.DeleteUserPublication(where)

      return res.send('')
    } catch (e) {
      return error.deletePublication(e.message)
    }
  }

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    return res.json({ message: 'Hello World!', userId })
  }

  private FactoryCreatePublication = (description: string, user_id: number) => {
    const date = nowDateUTC()

    return {
      photo: 'tempImage.jpg',
      description,
      date,
      user_id
    }
  }
}

export default new PublicationsController()

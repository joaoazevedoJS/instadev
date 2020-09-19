import { Request, Response } from 'express'

import LikesPublicationsModel from '../../model/LikesModel/LikesPublicationsModel'
import PublicationsModel from '../../model/PublicationsModel/PublicationsModel'

import LikeError from '../../errors/LikeError'
import PublicationsErrors from '../../errors/PublicationsErrors'

import nowDateUTC from '../../utils/NowDateUTC'

class LikesPublicationsController {
  private _likeModel = new LikesPublicationsModel()
  private _publicationModel = new PublicationsModel()

  private _likeError = (res: Response) => new LikeError(res)
  private _publicationError = (res: Response) => new PublicationsErrors(res)

  public index = async (req: Request, res: Response) => {
    const { publicationId } = req.params

    const likes = await this._likeModel.getPublicationLikes(Number(publicationId))

    return res.json(likes)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { publicationId } = req.params

    const likeError = this._likeError(res)
    const publicationError = this._publicationError(res)

    const where = this.factoryWhereLike(userId, Number(publicationId))

    const data = { ...where, created_at: nowDateUTC() }

    const alreadyLiked = await this._likeModel.getLike(where)

    if (alreadyLiked) return likeError.alreadyLiked()

    const existsPublication = await this._publicationModel.existsPublication(Number(publicationId))

    if (!existsPublication) return publicationError.publicationNotFound()

    try {
      const id = await this._likeModel.CreatePublicationLike(data)

      return res.json({ id, ...data })
    } catch (e) {
      return likeError.createNewLike(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { publicationId } = req.params

    const likeError = this._likeError(res)

    const where = this.factoryWhereLike(userId, Number(publicationId))

    const userLiked = await this._likeModel.getLike(where)

    if (!userLiked) return likeError.dontAuthorization()

    try {
      await this._likeModel.deletePublicationLike(where)

      return res.send('')
    } catch (e) {
      return likeError.deleteLike(e.message)
    }
  }

  private factoryWhereLike = (user_id: number, publication_id: number) => {
    return { user_id, publication_id }
  }
}

export default new LikesPublicationsController()

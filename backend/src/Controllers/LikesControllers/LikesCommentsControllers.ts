import { Request, Response } from 'express'

import knex from '../../database/connection'
import LikesCommentsModel from '../../model/LikesModel/LikesCommentsModel'
import CommentsModel from '../../model/CommentsModel/CommentsModel'

import LikeError from '../../errors/LikeError'
import CommentsErrors from '../../errors/CommentsErrors'

import nowDateUTC from '../../utils/NowDateUTC'

class LikesCommentsController {
  private _likeModel = new LikesCommentsModel()
  private _commentsModel = new CommentsModel()

  private _likeError = (res: Response) => new LikeError(res)
  private _commentsError = (res: Response) => new CommentsErrors(res)

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentId } = req.params

    const likeError = this._likeError(res)
    const commentsError = this._commentsError(res)

    const where = this.factoryWhereLike(userId, Number(commentId))

    const data = { ...where, created_at: nowDateUTC() }

    const alreadyLiked = await this._likeModel.getLike(where)

    if (alreadyLiked) return likeError.alreadyLiked()

    const existsComment = await this._commentsModel.existsComment(Number(commentId))

    if (!existsComment) return commentsError.commentaryNotFound()

    try {
      const id = await this._likeModel.CreateCommentsLike(data)

      return res.json({ id, ...data })
    } catch (e) {
      return likeError.deleteLike(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentId } = req.params

    const likeError = this._likeError(res)

    const where = this.factoryWhereLike(userId, Number(commentId))

    const userLiked = await this._likeModel.getLike(where)

    if (!userLiked) return likeError.dontAuthorization()

    try {
      await this._likeModel.deleteCommentsLike(where)

      return res.send('')
    } catch (e) {
      return likeError.deleteLike(e.message)
    }
  }

  private factoryWhereLike = (user_id: number, comments_id: number) => {
    return { user_id, comments_id }
  }
}

export default new LikesCommentsController()

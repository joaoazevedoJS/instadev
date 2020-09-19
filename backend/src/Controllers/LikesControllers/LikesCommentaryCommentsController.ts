import { Request, Response } from 'express'

import LikesCommentaryOfCommentsModel from '../../model/LikesModel/LikesCommentaryOfCommentsModel'
import CommentaryOfCommentsModel from '../../model/CommentsModel/CommentaryOfCommentsModel'

import LikeError from '../../errors/LikeError'
import CommentsErrors from '../../errors/CommentsErrors'

import nowDateUTC from '../../utils/NowDateUTC'

class LikesCommentaryCommentsController {
  private _likeModel = new LikesCommentaryOfCommentsModel()
  private _commentaryOfCommentsModel = new CommentaryOfCommentsModel()

  private _likeError = (res: Response) => new LikeError(res)
  private _commentsError = (res: Response) => new CommentsErrors(res)

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentaryId } = req.params

    const likeError = this._likeError(res)
    const commentsError = this._commentsError(res)

    const where = this.factoryWhereLike(userId, Number(commentaryId))

    const data = { ...where, created_at: nowDateUTC() }

    const alreadyLiked = await this._likeModel.getLike(where)

    if (alreadyLiked) return likeError.alreadyLiked()

    const existsComment = await this._commentaryOfCommentsModel.existsCommentary(where.commentary_comments_id)

    if (!existsComment) return commentsError.commentaryNotFound()

    try {
      const id = await this._likeModel.CreateCommentaryLike(data)

      return res.json({ id, ...data })
    } catch (e) {
      return likeError.createNewLike(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentaryId } = req.params

    const likeError = this._likeError(res)

    const where = this.factoryWhereLike(userId, Number(commentaryId))

    const userLiked = await this._likeModel.getLike(where)

    if (!userLiked) return likeError.dontAuthorization()

    try {
      await this._likeModel.deleteCommentaryLike(where)

      return res.send('')
    } catch (e) {
      return likeError.deleteLike(e.message)
    }
  }

  private factoryWhereLike = (user_id: number, commentary_comments_id: number) => {
    return { user_id, commentary_comments_id }
  }
}

export default new LikesCommentaryCommentsController()

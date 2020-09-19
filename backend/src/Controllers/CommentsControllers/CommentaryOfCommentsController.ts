// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'

import CommentsModel from '../../model/CommentsModel/CommentsModel'
import CommentaryOfCommentsModel from '../../model/CommentsModel/CommentaryOfCommentsModel'

import nowDateUTC from '../../utils/NowDateUTC'

class CommentaryOfCommentsController {
  private _commentaryCommentsModel = new CommentaryOfCommentsModel()
  private _commentsModel = new CommentsModel()

  private _error = (response: Response) => new CommentsErrors(response)

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { message } = req.body
    const { commentId } = req.params

    const error = this._error(res)

    const existsComment = await this._commentsModel.existsComment(Number(commentId))

    if (!existsComment) return error.commentaryNotFound()

    const data = this.factoryMessage(Number(userId), String(message), Number(commentId))

    try {
      const id = await this._commentaryCommentsModel.CreateCommentary(data)

      return res.json({ id, ...data })
    } catch (e) {
      return error.deleteCommentary(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentaryId } = req.params

    const error = this._error(res)

    const where = {
      id: Number(commentaryId),
      user_id: Number(userId)
    }

    const existsCommentary = await this._commentaryCommentsModel.existsCommentary(where.id)

    if (!existsCommentary) return error.commentaryNotFound()

    if (existsCommentary.user_id !== userId) return error.dontAuthorization()

    try {
      await this._commentaryCommentsModel.DeleteCommentary(where)

      res.send('')
    } catch (e) {
      return error.deleteCommentary(e.message)
    }
  }

  private factoryMessage = (user_id: number, message: string, comment_id: number) => {
    const created_at = nowDateUTC()

    return { user_id, message, comment_id, created_at }
  }
}

export default new CommentaryOfCommentsController()

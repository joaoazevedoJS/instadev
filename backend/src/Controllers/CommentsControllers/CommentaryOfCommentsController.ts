// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'
import CommentsModel from '../../model/CommentsModel/CommentsModel'
import CommentaryOfCommentsModel from '../../model/CommentsModel/CommentaryOfCommentsModel'

class CommentaryOfCommentsController {
  private _commentaryCommentsModel = new CommentaryOfCommentsModel()
  private _commentsModel = new CommentsModel()
  private _error = (response: Response) => new CommentsErrors(response)

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { message } = req.body
    const { CommentId } = req.params

    const error = this._error(res)

    const existsComment = await this._commentsModel.existsComment(userId)

    if (!existsComment) return error.commentaryNotFound()

    const data = {
      message,
      user_id: Number(userId),
      comment_id: Number(CommentId)
    }

    try {
      const comments = await CreateCommentary(data)

      return res.json(comments)
    } catch (e) {
      return error.deleteCommentary(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { CommentFromCommentsId } = req.params

    const { DeleteCommentary } = new CommentsOfCommentaryModel()

    const where = {
      id: Number(CommentFromCommentsId),
      user_id: Number(userId)
    }

    try {
      const deleteCommentary: any = await DeleteCommentary(where)

      if (deleteCommentary.status) return res.status(deleteCommentary.status).json(deleteCommentary)

      res.send('')
    } catch (e) {
      const { errorInDeleteCommentary } = new CommentsErrors()

      return res.status(errorInDeleteCommentary.status).json(errorInDeleteCommentary)
    }
  }
}

export default new CommentaryOfCommentsController()

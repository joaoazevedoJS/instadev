// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'
import CommentsOfCommentaryModel from '../../model/CommentsModel/CommentsOfCommentaryModel'

class CommentsOfCommentaryController extends CommentsOfCommentaryModel {
  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { message } = req.body
    const { CommentId } = req.params

    const ExistsComment = await super.Read('publications_comments', { id: Number(CommentId) }, true)

    const { errorCommentaryNotFound, errorInDeleteCommentary } = new CommentsErrors()

    if (!ExistsComment) return res.status(errorCommentaryNotFound.status).json(errorCommentaryNotFound)

    const data = {
      message,
      user_id: Number(userId),
      comment_id: Number(CommentId)
    }

    try {
      const comments = await super.CreateCommentary(data)

      return res.json(comments)
    } catch (e) {
      return res.status(errorInDeleteCommentary.status).json(errorInDeleteCommentary)
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { CommentFromCommentsId } = req.params

    const where = {
      id: Number(CommentFromCommentsId),
      user_id: Number(userId)
    }

    try {
      const deleteCommentary: any = await super.DeleteCommentary(where)

      if (deleteCommentary.status) return res.status(deleteCommentary.status).json(deleteCommentary)

      res.send('')
    } catch (e) {
      const { errorInDeleteCommentary } = new CommentsErrors()

      return res.status(errorInDeleteCommentary.status).json(errorInDeleteCommentary)
    }
  }
}

export default CommentsOfCommentaryController

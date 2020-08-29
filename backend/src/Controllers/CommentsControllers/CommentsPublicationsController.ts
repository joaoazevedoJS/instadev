// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'
import CommentsModel from '../../model/CommentsModel/CommentsModel'

class CommentsPublicationsController extends CommentsModel {
  async index (req: Request, res: Response) {
    const { page } = req.query
    const { PublicationId } = req.params

    const comments = await super.ReadComments(Number(PublicationId), Number(page))

    res.json(comments)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { message } = req.body
    const { PublicationId } = req.params

    const { errorMessageNoContent, errorPublicationNotFound, errorInCreateCommentary } = new CommentsErrors()

    if (String(message).trim() === '') return res.status(errorMessageNoContent.status).json(errorMessageNoContent)

    const ExistsPublication = await super.Read('publications', { id: Number(PublicationId) }, true)

    if (!ExistsPublication) return res.status(errorPublicationNotFound.status).json(errorPublicationNotFound)

    const data = {
      user_id: Number(userId),
      message,
      publication_id: Number(PublicationId)
    }

    try {
      const comments = await super.CreateCommentary(data)

      return res.json(comments)
    } catch (e) {
      return res.status(errorInCreateCommentary.status).json(errorInCreateCommentary)
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { CommentId } = req.params

    const data = {
      id: Number(CommentId),
      user_id: Number(userId)
    }

    try {
      const userComments: any = await super.DeleteCommentary(data)

      if (userComments.status) return res.status(userComments.status).json(userComments)

      return res.send('')
    } catch (e) {
      const { errorInDeleteCommentary } = new CommentsErrors()

      return res.status(errorInDeleteCommentary.status).json(errorInDeleteCommentary)
    }
  }
}

export default CommentsPublicationsController

import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'
import PublicationsErrors from '../../errors/PublicationsErrors'
import CommentsModel from '../../model/CommentsModel/CommentsModel'
import PublicationsModel from '../../model/PublicationsModel/PublicationsModel'

class CommentsPublicationsController {
  private _commentsModel = new CommentsModel()
  private _publicationModel = new PublicationsModel()

  private _commentsError = (response: Response) => new CommentsErrors(response)
  private _publicationError = (response: Response) => new PublicationsErrors(response)

  public index = async (req: Request, res: Response) => {
    const { page } = req.query
    const { PublicationId } = req.params

    const { ReadComments } = new CommentsModel()

    const comments = await ReadComments(Number(PublicationId), Number(page))

    res.json(comments)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { message } = req.body
    const { PublicationId } = req.params

    const commentsError = this._commentsError(res)
    const publicationError = this._publicationError(res)

    if (String(message).trim() === '') return commentsError.messageNoContent()

    const existsPublication = await this._publicationModel.existsPublication(Number(PublicationId))

    if (!existsPublication) return publicationError.publicationNotFound()

    const data = {
      user_id: Number(userId),
      message,
      publication_id: Number(PublicationId)
    }

    try {
      const id = await this._commentsModel.CreateCommentary(data)

      return res.json({ id, ...data })
    } catch (e) {
      return commentsError.createCommentary(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { CommentId } = req.params

    const data = {
      id: Number(CommentId),
      user_id: Number(userId)
    }

    const { DeleteCommentary } = new CommentsModel()

    try {
      const userComments: any = await DeleteCommentary(data)

      if (userComments.status) return res.status(userComments.status).json(userComments)

      return res.send('')
    } catch (e) {
      const { errorInDeleteCommentary } = new CommentsErrors()

      return res.status(errorInDeleteCommentary.status).json(errorInDeleteCommentary)
    }
  }
}

export default new CommentsPublicationsController()

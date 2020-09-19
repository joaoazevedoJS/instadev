import { Request, Response } from 'express'

import CommentsErrors from '../../errors/CommentsErrors'
import PublicationsErrors from '../../errors/PublicationsErrors'

import CommentsModel from '../../model/CommentsModel/CommentsModel'
import PublicationsModel from '../../model/PublicationsModel/PublicationsModel'

import nowDateUTC from '../../utils/NowDateUTC'

class CommentsPublicationsController {
  private _commentsModel = new CommentsModel()
  private _publicationModel = new PublicationsModel()

  private _commentsError = (response: Response) => new CommentsErrors(response)
  private _publicationError = (response: Response) => new PublicationsErrors(response)

  public index = async (req: Request, res: Response) => {
    const { page } = req.query
    const { publicationId } = req.params

    const comments = await this._commentsModel.ReadComments(Number(publicationId), Number(page))

    res.json(comments)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { message } = req.body
    const { publicationId } = req.params

    const commentsError = this._commentsError(res)
    const publicationError = this._publicationError(res)

    if (String(message).trim() === '') return commentsError.messageNoContent()

    const existsPublication = await this._publicationModel.existsPublication(Number(publicationId))

    if (!existsPublication) return publicationError.publicationNotFound()

    const data = this.factoryMessage(Number(userId), String(message), Number(publicationId))

    try {
      const id = await this._commentsModel.CreateCommentary(data)

      return res.json({ id, ...data })
    } catch (e) {
      return commentsError.createCommentary(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { commentId } = req.params

    const commentaryError = this._commentsError(res)

    const where = { id: Number(commentId), user_id: Number(userId) }

    const existCommentary = await this._commentsModel.existsComment(where.id)

    if (!existCommentary) return commentaryError.commentaryNotFound()

    if (existCommentary.user_id !== userId) return commentaryError.dontAuthorization()

    try {
      await this._commentsModel.DeleteCommentary(where)

      return res.send('')
    } catch (e) {
      return commentaryError.deleteCommentary(e.message)
    }
  }

  private factoryMessage = (user_id: number, message: string, publication_id: number) => {
    const created_at = nowDateUTC()

    return { user_id, message, publication_id, created_at }
  }
}

export default new CommentsPublicationsController()

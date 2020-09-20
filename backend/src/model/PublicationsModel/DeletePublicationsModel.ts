import knex from '../../database/connection'

import { IWherePublications } from '../../interfaces/IPublications'

import SimpleCRUD from '../SimpleCRUD'

import LikesPublicationsModel from '../LikesModel/LikesPublicationsModel'
import LikesCommentsModel from '../LikesModel/LikesCommentsModel'
import LikesCommentaryOfCommentsModel from '../LikesModel/LikesCommentaryOfCommentsModel'

import CommentsModel from '../CommentsModel/CommentsModel'
import CommentaryOfCommentsModel from '../CommentsModel/CommentaryOfCommentsModel'

class DeletePublicationsModel extends SimpleCRUD {
  private _likesPublicationModel = new LikesPublicationsModel()
  private _likesCommentsModel = new LikesCommentsModel()
  private _likesCommentaryOfCommentsModel = new LikesCommentaryOfCommentsModel()

  private _commentsModel = new CommentsModel()
  private _commentaryOfCommentsModel = new CommentaryOfCommentsModel()

  constructor () { super('publications') }

  private DeletePublicationComments = async (publication_id: number) => {
    const comments_id: Array<{ id: number }> = await this._commentsModel.ReadReturnSelectWithWhere(['id'], { publication_id })

    await Promise.all(comments_id.map(async comment => {
      await this.DeletePublicationCommentary(comment.id)
      await this.DeleteLikeComments(comment.id)
    }))

    await this._commentsModel.Delete({ publication_id })
  }

  private DeleteLikeComments = async (comments_id: number) => {
    await this._likesCommentsModel.Delete({ comments_id })
  }

  private DeletePublicationCommentary = async (comment_id: number) => {
    const commentary_comments_id: Array<{ id: number }> = await this._commentaryOfCommentsModel.ReadReturnSelectWithWhere(['id'], { comment_id })

    await Promise.all(commentary_comments_id.map(async comment => { await this.DeleteLikeCommentary(comment.id) }))

    await this._commentaryOfCommentsModel.Delete({ comment_id })
  }

  private DeleteLikeCommentary = async (commentary_comments_id: number) => {
    await this._likesCommentaryOfCommentsModel.Delete({ commentary_comments_id })
  }

  public DeleteUserPublication = async (where: IWherePublications) => {
    await this._likesPublicationModel.Delete({ publication_id: where.id })
    await this.DeletePublicationComments(where.id)
    await this.Delete(where)
  }
}

export default DeletePublicationsModel

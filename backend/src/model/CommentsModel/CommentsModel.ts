import knex from '../../database/connection'
import SimpleCRUD from '../SimpleCRUD'

import { IComment, ICreateCommentary, ICommentWhere, ISearchComments, ICommentaryWithComments } from '../../interfaces/IComments'

import LikesCommentsModel from '../LikesModel/LikesCommentsModel'

class CommentsModel extends SimpleCRUD {
  private _likes = new LikesCommentsModel()

  constructor () { super('publications_comments') }

  public CreateCommentary = async (data: ICreateCommentary) => {
    const createData = await this.Create(data)

    return createData[0]
  }

  public ReadComments = async (PublicationId: number, page: number) => {
    const comments: Array<ISearchComments> = await knex('publications_comments')
      .leftJoin('comments_likes', 'comments_likes.comments_id', '=', 'publications_comments.id')
      .join('users', 'users.id', '=', 'publications_comments.user_id')
      .where('publications_comments.publication_id', PublicationId)
      .select([
        'publications_comments.*',
        'users.user_name'
      ])
      .groupBy('publications_comments.id')
      .limit(10)
      .offset((page - 1) * 10)
      .count('comments_likes.comments_id as likes')

    const CommentsAndCommentarys = await this.commentaryOfComments(comments)

    return CommentsAndCommentarys
  }

  public DeleteCommentary = async (where: ICommentWhere) => {
    await this._likes.Delete({ comments_id: where.id })
    await this.Delete(where)
  }

  public existsComment = async (id: number) => {
    const commentary: IComment = await this.ReadWithWhereFirst({ id })

    return commentary
  }

  private commentaryOfComments = async (comments: Array<ISearchComments>) => {
    const commentary = await Promise.all(comments.map(async comment => this.joinCommentaryWithComments(comment)))

    return commentary
  }

  private joinCommentaryWithComments = async (comment: ISearchComments) => {
    const commentaryOfComments: Array<ICommentaryWithComments> = await knex('commentary_comments')
      .leftJoin('commentary_comments_likes', 'commentary_comments_likes.commentary_comments_id', '=', 'commentary_comments.id')
      .join('users', 'users.id', '=', 'commentary_comments.user_id')
      .where('commentary_comments.comment_id', comment.id)
      .select([
        'commentary_comments.id',
        'users.user_name',
        'users.id as user_id',
        'commentary_comments.message',
        'commentary_comments.created_at'
      ])
      .groupBy('commentary_comments.id')
      .count('commentary_comments_likes.commentary_comments_id as likes')

    const commentary = {
      comment: { ...comment },
      commentary_of_comment: commentaryOfComments
    }

    return commentary
  }
}

export default CommentsModel

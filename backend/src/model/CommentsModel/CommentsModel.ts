import knex from '../../database/connection'
import SimpleCRUD from '../SimpleCRUD'

import { IComment, ICreateCommentary, ICommentWhere, ISearchComments, ICommentaryWithComments } from '../../interfaces/IComments'

class CommentsModel extends SimpleCRUD {
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
    const commentaryOfComments: Array<ICommentaryWithComments> = await knex('comments_comment')
      .leftJoin('comments_comment_likes', 'comments_comment_likes.comments_comment_id', '=', 'comments_comment.id')
      .join('users', 'users.id', '=', 'comments_comment.user_id')
      .where('comments_comment.comment_id', comment.id)
      .select([
        'comments_comment.id',
        'users.user_name',
        'users.id as user_id',
        'comments_comment.message',
        'comments_comment.created_at'
      ])
      .groupBy('comments_comment.id')
      .count('comments_comment_likes.comments_comment_id as likes')

    const commentary = {
      comment: { ...comment },
      commentary_of_comment: commentaryOfComments
    }

    return commentary
  }
}

export default CommentsModel

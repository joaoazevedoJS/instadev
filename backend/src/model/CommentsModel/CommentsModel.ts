import knex from '../../database/connection'
import SimpleCRUD from '../SimpleCRUD'

import CommentsErros from '../../errors/CommentsErrors'

import { IComment, ICreateCommentary } from '../../interfaces/IComments'

class CommentsModel extends SimpleCRUD {
  constructor () { super('publications_comments') }

  public CreateCommentary = async (data: ICreateCommentary) => {
    const createData = await this.Create(data)

    return createData[0]
  }

  public ReadComments = async (PublicationId: number, page: number) => {
    const comments = await knex('publications_comments')
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

    const allcomments = await Promise.all(comments.map(async comment => {
      const commentOfComment = await knex('comments_comment')
        .leftJoin('comments_comment_likes', 'comments_comment_likes.comments_comment_id', '=', 'comments_comment.id')
        .join('users', 'users.id', '=', 'comments_comment.user_id')
        .where('comments_comment.comment_id', comment.id)
        .select([
          'comments_comment.id',
          'users.user_name',
          'users.id as user_id',
          'comments_comment.message'
        ])
        .groupBy('comments_comment.id')
        .count('comments_comment_likes.comments_comment_id as likes')

      const comments = {
        comment: { ...comment },
        comments_of_comment: [...commentOfComment]
      }

      return comments
    }))

    return allcomments
  }

  public DeleteCommentary = async (where: IWhereUserDelete) => {
    const searchCommentary = await super.ReadWithWhereFirst('publications_comments', where)

    const { errorCommentaryNotFound } = new CommentsErros()

    if (!searchCommentary) return errorCommentaryNotFound

    await super.Delete('publications_comments', where)

    return false
  }

  public existsComment = async (id: number) => {
    const comment: IComment = await this.ReadWithWhereFirst({ id })

    return comment
  }
}

export default CommentsModel

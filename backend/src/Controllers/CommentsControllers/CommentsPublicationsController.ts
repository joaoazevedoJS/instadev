// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class CommentsPublicationsController {
  async index (req: Request, res: Response) {
    const { page } = req.query
    const { PublicationId } = req.params

    const comments = await knex('publications_comments')
      .leftJoin('comments_likes', 'comments_likes.comments_id', '=', 'publications_comments.id')
      .join('users', 'users.id', '=', 'publications_comments.user_id')
      .where('publications_comments.publication_id', Number(PublicationId))
      .select([
        'publications_comments.*',
        'users.user_name'
      ])
      .groupBy('publications_comments.id')
      .limit(10)
      .offset((Number(page) - 1) * 10)
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

    res.json(allcomments)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { message } = req.body
    const { PublicationId } = req.params

    if (String(message) === '') return res.status(401).json({ error: 'Message no Content' })

    const ExistsPublication = await knex('publications')
      .where('id', Number(PublicationId)).first()

    if (!ExistsPublication) return res.status(404).json({ error: 'Publication not Found' })

    const data = {
      user_id: Number(userId),
      message,
      publication_id: Number(PublicationId)
    }

    try {
      const comments = await knex('publications_comments').insert(data)

      return res.json(comments)
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { CommentId } = req.params

    const data = {
      id: Number(CommentId),
      user_id: Number(userId)
    }

    const userComments = await knex('publications_comments')
      .where(data).first()
      // Only users who liked can dislike
    if (!userComments) return res.status(401).json({ error: 'Only users who comments can discomments' })

    try {
      await knex('publications_comments')
        .where('id', CommentId).first().delete()

      return res.send('')
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }
}

export default CommentsPublicationsController

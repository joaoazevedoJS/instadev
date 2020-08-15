// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class CommentsOfCommentsController {
  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { message } = req.body
    const { CommentId } = req.params

    const ExistsComment = await knex('publications_comments')
      .where('id', Number(CommentId)).first()

    if (!ExistsComment) return res.status(404).json({ error: 'Comment not Found' })

    const data = {
      message,
      user_id: Number(userId),
      comment_id: Number(CommentId)
    }

    try {
      const comments = await knex('comments_comment').insert(data)

      return res.json(comments)
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { CommentFromCommentsId } = req.params

    const data = {
      id: Number(CommentFromCommentsId),
      user_id: Number(userId)
    }

    const userComment = await knex('comments_comment')
      .where(data).first()

    if (!userComment) {
      return res.status(401).json({ error: 'Only the user who commented can delete them' })
    }

    try {
      await knex('comments_comment')
        .where(data).first().delete()

      res.json(userComment)
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }
}

export default CommentsOfCommentsController

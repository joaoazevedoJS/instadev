// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../../database/connection'

class LikesCommentsOfCommentController {
  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { CommentCommentId } = req.params

    const data = {
      user_id: Number(userId),
      comments_comment_id: Number(CommentCommentId)
    }

    const AlreadyLiked = await knex('comments_comment_likes')
      .where(data).first()

    if (AlreadyLiked) return res.status(401).json({ error: 'you can\'t liked again' })

    const ExistsComment = await knex('comments_comment')
      .where('id', Number(CommentCommentId)).first()

    if (!ExistsComment) return res.status(404).json({ error: 'Comment not Found' })

    try {
      const [id] = await knex('comments_comment_likes').insert(data)

      return res.json({ id, ...data })
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { LikeId } = req.params

    const data = {
      id: LikeId,
      user_id: userId
    }

    const userLiked = await knex('comments_comment_likes')
      .where(data).first()

    if (!userLiked) return res.status(401).json({ error: 'Only users who liked can dislike' })

    try {
      await knex('comments_comment_likes')
        .where('id', LikeId).first().delete()

      return res.send('')
    } catch (e) {
      return res.status(500).json({ error: 'Error, Try again' })
    }
  }
}

export default LikesCommentsOfCommentController

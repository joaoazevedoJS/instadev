// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import knex from '../database/connection'

class FollowingController {
  async index (req: Request, res: Response) {
    const { userId } = req.userSession
    let { order } = req.query

    if (order !== 'desc' && order !== 'asc') {
      order = 'asc'
    }

    const following = await knex('following')
      .where('user_id', userId).orderBy('id', order)

    return res.json(following)
  }

  async store (req: Request, res: Response) {
    const { userId } = req.userSession
    const { followId } = req.params

    const ExistsUser = await knex('users')
      .where('id', followId).first()

    if (!ExistsUser) { return res.status(404).json({ error: 'User that\'s try following not Exists' }) }
    if (isNaN(Number(followId))) return res.status(400).json({ error: 'Invalid user ID' })
    if (userId === Number(followId)) { return res.status(401).json({ error: 'You can\'t following you' }) }

    const data = {
      user_id: userId,
      following_id: followId
    }

    const isFollowing = await knex('following')
      .where(data).first()

    if (isFollowing) { return res.status(406).json({ error: 'You can\'t following again' }) }

    try {
      const following = await knex('following').insert(data)

      return res.json(following)
    } catch (e) {
      return res.status(500).json({ error: 'Something went wrong, try again' })
    }
  }

  async destroy (req: Request, res: Response) {
    const { userId } = req.userSession
    const { followId } = req.params

    if (isNaN(Number(followId))) return res.status(400).json({ error: 'Invalid user ID' })
    if (userId === Number(followId)) { return res.status(401).json({ error: 'You can\'t unfollowing you' }) }

    const data = {
      user_id: userId,
      following_id: followId
    }

    try {
      await knex('following')
        .where(data).first().delete()

      return res.send('')
    } catch (e) {
      return res.status(500).json({ error: 'Something went wrong, try again' })
    }
  }
}

export default FollowingController

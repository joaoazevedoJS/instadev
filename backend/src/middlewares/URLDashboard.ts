// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import knex from '../database/connection'

async function URLDashboard (req: Request, res: Response, next: NextFunction) {
  const { user } = req.query

  if (!user) return res.status(404).json({ error: 'User Not Found' })

  const id = await knex('users')
    .select('id')
    .where('user_name', String(user)).first()

  if (!id) return res.status(404).json({ error: 'User Not Found' })

  req.params = id

  next()
}

export default URLDashboard

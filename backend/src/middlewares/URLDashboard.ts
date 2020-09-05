// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import knex from '../database/connection'

import UserError from '../errors/UserError'

async function URLDashboard (req: Request, res: Response, next: NextFunction) {
  const { user } = req.query

  const { errorUserNotFound } = new UserError()

  if (!user) return res.status(errorUserNotFound.status).json(errorUserNotFound)

  const id = await knex('users')
    .select('id')
    .where('user_name', String(user).trim()).first()

  if (!id) return res.status(errorUserNotFound.status).json(errorUserNotFound)

  req.params = id

  next()
}

export default URLDashboard

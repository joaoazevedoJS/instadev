// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import SimpleCRUD from '../model/SimpleCRUD'
import UserError from '../errors/UserError'

async function URLDashboard (req: Request, res: Response, next: NextFunction) {
  const { user } = req.query

  const { errorUserNotFound } = new UserError()
  const { ReadReturnSelectWithWhereFirst } = new SimpleCRUD()

  if (!user) return res.status(errorUserNotFound.status).json(errorUserNotFound)

  const id = await ReadReturnSelectWithWhereFirst('users', { id: 'id' }, { user_name: String(user).trim() })

  if (!id) return res.status(errorUserNotFound.status).json(errorUserNotFound)

  req.params = id

  next()
}

export default URLDashboard

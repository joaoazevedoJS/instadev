// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import UserError from '../errors/UserError'
import SimpleCRUD from '../model/SimpleCRUD'

async function isMailVerified (req: Request, res: Response, next: NextFunction) {
  const { userId } = req.userSession

  const { ReadReturnSelectWithWhereFirst } = new SimpleCRUD()
  const { errorMailNotVerified } = new UserError()

  const { confirmAccount } = await ReadReturnSelectWithWhereFirst('users', { confirmAccount: 'confirmAccount' }, { id: userId })

  if (!!confirmAccount === false) return res.status(errorMailNotVerified.status).json(errorMailNotVerified)

  next()
}

export default isMailVerified

// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import SimpleCRUD from '../../model/SimpleCRUD'

import { hash } from '../configs/tokenConfig.json'

import AuthorizationError from '../../errors/AuthorizationError'
import UserError from '../../errors/UserError'

interface Decoded {
  id: number,
  iat: number,
  exp: number
}

function Authorization (req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization

  const { errorNoTokenProvided, errorTokenMalformed, errorTokenInvalid } = new AuthorizationError()

  if (!auth) return res.status(errorNoTokenProvided.status).json(errorNoTokenProvided)

  const [schema, token] = auth.split(' ')

  if (!/^Bearer$/i.test(schema) || !token) {
    return res.status(errorTokenMalformed.status).json(errorTokenMalformed)
  }

  jwt.verify(token, hash, async (err, decoded: Decoded) => {
    if (err) return res.status(errorTokenInvalid.status).json(errorTokenInvalid)

    const userId = decoded.id

    const { ReadWithWhereFirst } = new SimpleCRUD()
    const { errorUserNotFound } = new UserError()

    const user = await ReadWithWhereFirst('users', { id: userId })

    if (!user) return res.status(errorUserNotFound.status).json(errorUserNotFound)

    req.userSession = { userId }

    return next()
  })
}

export default Authorization

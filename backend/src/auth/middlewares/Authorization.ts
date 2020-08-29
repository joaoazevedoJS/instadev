// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import knex from '../../database/connection'
import { hash } from '../configs/hash.json'

import AuthorizationError from 'src/errors/AuthorizationError'

interface Decoded {
  id: number,
  iat: number,
  exp: number
}

function Authorization (req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization

  const { errorNoTokenProvided } = new AuthorizationError()

  if (!auth) return res.status(errorNoTokenProvided.status).json(errorNoTokenProvided)

  const parts = auth.split(' ')

  if (parts.length !== 2) return res.status(401).json({ error: 'Token Error' })

  const [schema, token] = parts

  if (!/^Bearer$/i.test(schema)) return res.status(401).json({ error: 'Token Malformed' })

  jwt.verify(token, hash, async (err, decoded: Decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid Token' })

    const userId = decoded.id

    const user = await knex('users').where('id', userId).first()

    if (!user) return res.status(404).json({ error: 'User not Found' })

    req.userSession = { userId }

    return next()
  })
}

export default Authorization

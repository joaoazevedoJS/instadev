// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import knex from '../database/connection'

async function isMailVerified (req: Request, res: Response, next: NextFunction) {
  const { userId } = req.userSession

  const { confirmAccount } = await knex('users')
    .select('confirmAccount')
    .where('id', userId).first()

  if (!!confirmAccount === false) return res.status(401).json({ error: 'Email not Verified' })

  next()
}

export default isMailVerified

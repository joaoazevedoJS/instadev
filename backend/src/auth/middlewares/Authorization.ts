// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { hash } from '../configs/tokenConfig.json'

import { Decoded } from '../../interfaces/IAuthorization'

import UserModel from '../../model/UsersModel/UserModel'

import AuthorizationError from '../../errors/AuthorizationError'
import UserError from '../../errors/UserError'

class Authorization {
  private _model = new UserModel()
  private _authError = new AuthorizationError()
  private _userError = new UserError()

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth) {
      return res.status(this._authError.errorNoTokenProvided.status).json(this._authError.errorNoTokenProvided)
    }

    const [schema, token] = auth.split(' ')

    if (!/^Bearer$/i.test(schema) || !token) {
      return res.status(this._authError.errorTokenMalformed.status).json(this._authError.errorTokenMalformed)
    }

    jwt.verify(token, hash, async (err, decoded: Decoded) => {
      if (err) {
        return res.status(this._authError.errorTokenInvalid.status).json(this._authError.errorTokenInvalid)
      }

      const userId = decoded.id

      const user = await this._model.ReadWithWhereFirst({ id: userId })

      if (!user) return res.status(this._userError.errorUserNotFound.status).json(this._userError.errorUserNotFound)

      req.userSession = { userId }

      return next()
    })
  }
}

export default new Authorization()

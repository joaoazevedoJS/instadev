import { Request, Response, NextFunction } from 'express'

import UserModel from '../model/UsersModel/UserModel'
import UserError from '../errors/UserError'

class URLDashboard {
  private _model = new UserModel()
  private _error = new UserError()

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.query

    if (!user) {
      return res.status(this._error.errorUserNotFound.status).json(this._error.errorUserNotFound)
    }

    const user_name = String(user).trim()

    if (user_name.split(' ').length !== 1) {
      return res.status(this._error.errorUserNameMalformed.status).json(this._error.errorUserNameMalformed)
    }

    const id = await this._model.ReadReturnSelectWithWhereFirst(['id'], { user_name })

    if (!id) {
      return res.status(this._error.errorUserNotFound.status).json(this._error.errorUserNotFound)
    }

    req.params = id

    next()
  }
}

export default new URLDashboard()

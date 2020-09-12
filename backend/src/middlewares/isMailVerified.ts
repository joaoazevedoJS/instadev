import { Request, Response, NextFunction } from 'express'

import MailError from '../errors/MailError'
import UserModel from '../model/UsersModel/UserModel'

class IsMailVerified {
  private _model = new UserModel()
  private _error = new MailError()

  public show = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.userSession

    const user = await this._model.ReadReturnSelectWithWhereFirst(['confirmAccount'], { id: userId })

    if (!user.confirmAccount) {
      return res.status(this._error.errorMailNotVerified.status).json(this._error.errorMailNotVerified)
    }

    next()
  }
}

export default new IsMailVerified()

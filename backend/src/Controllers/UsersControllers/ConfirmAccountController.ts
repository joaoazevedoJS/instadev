import { Request, Response } from 'express'

import ConfirmAccountModel from '../../model/UsersModel/ConfirmAccountModel'

import UserError from '../../errors/UserError'
import MailError from '../../errors/MailError'

class ConfirmAccountController {
  private _model = new ConfirmAccountModel()
  private _userError = new UserError()
  private _mailError = new MailError()

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { code } = req.params

    const account = await this._model.GetAccount(userId)

    if (code !== account.code) {
      return res.status(this._userError.errorCodeNotExists.status).json(this._userError.errorCodeNotExists)
    }

    if (account.confirm_account) {
      return res.status(this._mailError.errorMailAlreadyVerified.status)
        .json(this._mailError.errorMailAlreadyVerified)
    }

    try {
      await this._model.UpdateAccount(userId)

      return res.send('')
    } catch (e) {
      return res.status(this._userError.errorUserUpdate.status).json(this._userError.errorUserUpdate)
    }
  }
}

export default new ConfirmAccountController()

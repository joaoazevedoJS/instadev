import { Request, Response } from 'express'

import ConfirmAccountModel from '../../model/UsersModel/ConfirmAccountModel'

import UserError from '../../errors/UserError'
import MailError from '../../errors/MailError'

class ConfirmAccountController {
  private _model = new ConfirmAccountModel()
  private _userError = (response: Response) => new UserError(response)
  private _mailError = (response: Response) => new MailError(response)

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { code } = req.params

    const userError = this._userError(res)
    const mailError = this._mailError(res)

    const account = await this._model.GetConfirmAccount(userId)

    if (code !== account.code) return userError.codeNotExists()

    if (account.confirm_account) return mailError.mailAlreadyVerified()

    try {
      await this._model.UpdateAccount(userId)

      return res.send('')
    } catch (e) {
      return userError.userUpdate(e.message)
    }
  }
}

export default new ConfirmAccountController()

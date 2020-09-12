import { Request, Response } from 'express'

import ResendCodeModel from '../../model/UsersModel/ResendCodeModel'

import MailError from '../../errors/MailError'

import Mails from '../../smtp/Mails'

import { IUser } from '../../interfaces/IUser'

class ResendCodeController {
  private _model = new ResendCodeModel()
  private _error = new MailError()
  private _mails = new Mails()

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    const user = await this._model.GetAccount(userId)

    if (user.confirmAccount) {
      return res.status(this._error.errorMailAlreadyVerified.status).json(this._error.errorMailAlreadyVerified)
    }

    if (user.limit_date_resend) {
      const maxLimitResend = await this.updateLimitResend(user)

      if (maxLimitResend) {
        return res.status(this._error.errorLimitResend.status).json(this._error.errorLimitResend)
      }
    }

    if (user.limit_resend === 3) {
      await this._model.UpdateLimiteData(user.id)
    }

    try {
      await this.sendCode(user)

      return res.json({ sucess: 'Email been send' })
    } catch (error) {
      return res.status(this._error.errorWhileSendMail.status).json(this._error.errorWhileSendMail)
    }
  }

  private updateLimitResend = async (user: IUser): Promise<boolean> => {
    const dateParse = new Date(Date.parse(user.limit_date_resend))
    const date = new Date()

    if (dateParse < date) {
      await this._model.UpdateLimiteResend(user.id, 0)

      return false
    }

    return true
  }

  private sendCode = async (user: IUser): Promise<void> => {
    await this._mails.mailConfirmAccount(user.email, user.accountCode)

    const { limit_resend } = await this._model.GetLimit(user.id)

    await this._model.UpdateLimiteResend(user.id, limit_resend + 1)
  }
}

export default new ResendCodeController()

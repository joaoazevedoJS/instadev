import { Request, Response } from 'express'

import ResendCodeModel from '../../model/UsersModel/ResendCodeModel'

import MailError from '../../errors/MailError'

import Mails from '../../smtp/Mails'

import { IUser } from '../../interfaces/IUser'

class ResendCodeController {
  private _model = (id: number) => new ResendCodeModel(id)
  private _error = (response: Response) => new MailError(response)
  private _mails = new Mails()

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession

    const model = this._model(userId)
    const error = this._error(res)

    const user = await model.GetAccount()

    if (user.confirmAccount) return error.mailAlreadyVerified()

    if (user.limit_date_resend) {
      const maxLimitResend = await this.updateLimitResend(user)

      if (maxLimitResend) return error.limitResend()
    }

    if (user.limit_resend >= 3) {
      await model.UpdateLimiteData()
    }

    try {
      await this.sendCode(user)

      return res.json({ sucess: 'Email been send' })
    } catch (e) {
      return error.whileSendMail(e.message)
    }
  }

  private updateLimitResend = async (user: IUser): Promise<boolean> => {
    const dateParse = new Date(Date.parse(user.limit_date_resend))
    const date = new Date()

    const model = this._model(user.id)

    if (dateParse < date) {
      await model.UpdateLimiteResend(0)

      return false
    }

    return true
  }

  private sendCode = async (user: IUser): Promise<void> => {
    await this._mails.mailConfirmAccount(user.email, user.accountCode)

    const model = this._model(user.id)

    const { limit_resend } = await model.GetLimit()

    await model.UpdateLimiteResend(limit_resend + 1)
  }
}

export default new ResendCodeController()

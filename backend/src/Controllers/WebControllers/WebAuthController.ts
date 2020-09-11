// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'

import ConfirmAccountModel from '../../model/UsersModel/ConfirmAccountModel'
import ResendCodeModel from '../../model/UsersModel/ResendCodeModel'

import UserError from '../../errors/UserError'
import MailError from '../../errors/MailError'

import SendMail from '../../utils/SendMail'

class WebAuthController {
  authenticated (req: Request, res: Response) {
    // if token is true
    res.send('')
  }

  async confirmAccount (req: Request, res: Response) {
    const { userId } = req.userSession
    const { code } = req.params

    const { GetAccount, UpdateAccount } = new ConfirmAccountModel()

    const { errorCodeNotExists, errorUserUpdate } = new UserError()
    const { errorMailAlreadyVerified } = new MailError()

    const account = await GetAccount(userId)

    if (code !== account.code) return res.status(errorCodeNotExists.status).json(errorCodeNotExists)

    if (account.confirm_account) return res.status(errorMailAlreadyVerified.status).json(errorMailAlreadyVerified)

    try {
      await UpdateAccount(userId)

      return res.send('')
    } catch (e) {
      return res.status(errorUserUpdate.status).json(errorUserUpdate)
    }
  }

  async resendCode (req: Request, res: Response) {
    const { userId } = req.userSession

    const { GetAccount, UpdateLimiteResend, UpdateLimiteData, GetLimit } = new ResendCodeModel()
    const { errorMailAlreadyVerified, errorLimitResend, errorWhileSendMail } = new MailError()

    const user = await GetAccount(userId)

    if (user.confirmAccount) return res.status(errorMailAlreadyVerified.status).json(errorMailAlreadyVerified)

    if (user.limit_date_resend) {
      const dateParse = new Date(Date.parse(user.limit_date_resend))
      const date = new Date()

      if (dateParse < date) {
        await UpdateLimiteResend(userId, 0)
      } else {
        return res.status(errorLimitResend.status).json(errorLimitResend)
      }
    }

    if (user.limit_resend === 3) {
      await UpdateLimiteData(userId)
    }

    try {
      await SendMail(
        user.email,
        'no-reply@mail.instadev.com',
        'confirm_account',
        { email: user.email, accountCode: user.accountCode }
      )

      const { limit_resend } = await GetLimit(userId)

      await UpdateLimiteResend(userId, limit_resend + 1)

      return res.json({ sucess: 'Email been send' })
    } catch (error) {
      return res.status(errorWhileSendMail.status).json(errorWhileSendMail)
    }
  }
}

export default new WebAuthController()

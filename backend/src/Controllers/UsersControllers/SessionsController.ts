import { Request, Response } from 'express'
import bycript from 'bcryptjs'

import Mails from '../../smtp/Mails'

import GenerateToken from '../../utils/GenerateToken'
import randomCode from '../../utils/randomCode'
import nowDateUTC from '../../utils/NowDateUTC'

import SessionsModel from '../../model/UsersModel/SessionsModel'
import checkPartsAndReturnName from '../../utils/checkPartsAndReturnName'
import UserError from '../../errors/UserError'

class SessionsController {
  private _mails = new Mails()
  private _model = new SessionsModel()

  private _error = (response: Response) => new UserError(response)

  public signup = async (req: Request, res: Response) => {
    let { email, user_name, name, password } = req.body

    user_name = checkPartsAndReturnName(String(user_name))

    const error = this._error(res)

    const existAccount = await this._model.existAccount(String(email), user_name)

    if (existAccount) return error.existsAccount()

    try {
      const data = await this.FactoryCreateAccountData(String(email), user_name, String(name), String(password))

      const id = await this._model.createAccount(data)

      await this._mails.mailConfirmAccount(email, data.accountCode)

      data.password = undefined

      return res.json({ id, ...data })
    } catch (e) {
      return error.userCreateAccount(e.message)
    }
  }

  public signin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const error = this._error(res)

    const user = await this._model.getPassword(String(email))

    if (!user) return error.userNotFound()

    const verifyPassword = await bycript.compare(String(password), user.password)

    if (!verifyPassword) return error.invalidPassword()

    const token = GenerateToken(user.id)

    return res.json({ token })
  }

  private FactoryCreateAccountData = async (email: string, user_name: string, name: string, password: string) => {
    const hash = await bycript.hash(password, 10)
    const accountCode = randomCode(6)
    const created_at = nowDateUTC()

    return {
      email,
      user_name,
      name,
      password: hash,
      confirmAccount: false,
      accountCode,
      privateAccount: false,
      created_at
    }
  }
}

export default new SessionsController()

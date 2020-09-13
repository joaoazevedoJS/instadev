import { Request, Response } from 'express'

import UserModel from '../../model/UsersModel/UserModel'
import UserError from '../../errors/UserError'

import checkPartsAndReturnName from '../../utils/checkPartsAndReturnName'

class VerifyAccountController {
  private _model = new UserModel()
  private _error = (response: Response) => new UserError(response)

  public verifyEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    const mailExists = await this._model.ReadReturnSelectWithWhereFirst(['email'], { email })

    return res.json({ exists: !!mailExists })
  }

  public verifyUserName = async (req: Request, res: Response) => {
    let { user_name } = req.body

    const error = this._error(res)

    user_name = checkPartsAndReturnName(String(user_name))

    if (!user_name) return error.userNameMalformed()

    const userNameExists = await this._model.ReadReturnSelectWithWhereFirst(['user_name'], { user_name })

    return res.json({ exists: !!userNameExists })
  }
}

export default new VerifyAccountController()

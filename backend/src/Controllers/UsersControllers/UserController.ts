import { Request, Response } from 'express'

import UserModel from '../../model/UsersModel/UserModel'
import UserError from '../../errors/UserError'

class UserController {
  private _model = new UserModel()
  private _error = (response: Response) => new UserError(response)

  public show = async (req: Request, res: Response) => {
    // it get id in URLDashboard.ts
    const { id } = req.params

    const following = await this._model.ReadWithWhereCount('following', { user_id: Number(id) })
    const followers = await this._model.ReadWithWhereCount('following', { following_id: Number(id) })
    const publications = await this._model.ReadWithWhereCount('publications', { user_id: Number(id) })

    const user = await this._model.ReadUserWithSelect(Number(id))

    res.header({
      'X-Total-Following': following,
      'X-Total-Followers': followers,
      'X-Total-Publications': publications
    })

    return res.json(user)
  }

  public update = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { privateAccount } = req.body

    const error = this._error(res)

    const data = {
      privateAccount: Boolean(privateAccount)
    }

    try {
      await this._model.UpdateUser(data, { id: userId })

      return res.send()
    } catch (e) {
      return error.userUpdate(e.message)
    }
  }
}

export default new UserController()

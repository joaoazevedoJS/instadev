/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'

import UserModel from '../../model/UsersModel/UserModel'
import { IUserUpdate } from '../../interfaces/IUser'
import UserError from '../../errors/UserError'

class UserController extends UserModel {
  async show (req: Request, res: Response) {
    // it get id in URLDashboard.ts
    const { id } = req.params

    const following = await super.ReadUserCount('following', { user_id: Number(id) })
    const followers = await super.ReadUserCount('following', { following_id: Number(id) })
    const publications = await super.ReadUserCount('publications', { user_id: Number(id) })

    const user = await super.ReadUser(Number(id))

    res.header({
      'X-Total-Following': following,
      'X-Total-Followers': followers,
      'X-Total-Publications': publications
    })

    return res.json(user)
  }

  async update (req: Request, res: Response) {
    const { userId } = req.userSession
    const { privateAccount } = req.body

    const data: IUserUpdate = {
      privateAccount: Boolean(privateAccount)
    }

    try {
      await super.UpdateUser(data, { id: Number(userId) })

      return res.send()
    } catch (e) {
      const { errorUserUpdate } = new UserError()

      return res.status(errorUserUpdate.status).json(errorUserUpdate)
    }
  }
}

export default UserController

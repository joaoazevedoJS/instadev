import { Request, Response } from 'express'

import SearchFollowModel from '../../model/UsersModel/SearchFollowModel'
import FollowModel from '../../model/UsersModel/FollowModel'
import UserModel from '../../model/UsersModel/UserModel'

import FollowError from '../../errors/FollowError'
import UserError from '../../errors/UserError'

import nowDateUTC from '../../utils/NowDateUTC'

class FollowController {
  private _searchFollowModel = (id: number, order: string, page: number) => new SearchFollowModel(id, order, page)
  private _followModel = new FollowModel()
  private _userModel = new UserModel()

  private _followError = (response: Response) => new FollowError(response)
  private _userError = (response: Response) => new UserError(response)

  public index = async (req: Request, res: Response) => {
    const { id } = req.params
    const { order, page, followType } = req.query

    const model = this._searchFollowModel(Number(id), String(order), Number(page))

    const follow = followType === 'following'
      ? await model.ReadUserFollowing()
      : await model.ReadUserFollowers()

    return res.json(follow)
  }

  public store = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { followId } = req.params

    const userError = this._userError(res)
    const followError = this._followError(res)

    const following_id = Number(followId)

    if (isNaN(following_id)) return userError.invalidUserId()

    const existsUser = await this._userModel.GetAccount(following_id)

    if (!existsUser) return userError.userNotFound()

    if (userId === following_id) return followError.cantFollow()

    const data = { user_id: userId, following_id, created_at: nowDateUTC() }

    const isFollowing = await this._followModel.isFollow(data)

    if (isFollowing) return followError.cantFollowAgain()

    try {
      const following = await this._followModel.createFollow(data)

      return res.json(following)
    } catch (e) {
      return followError.createNewFollow(e.message)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { followId } = req.params

    const userError = this._userError(res)
    const followError = this._followError(res)

    const following_id = Number(followId)

    if (isNaN(following_id)) return userError.invalidUserId()

    const existsUser = await this._userModel.GetAccount(following_id)

    if (!existsUser) return userError.userNotFound()

    if (userId === following_id) return followError.cantUnFollow()

    const where = { user_id: userId, following_id }

    try {
      await this._followModel.deleteFollow(where)

      return res.send('')
    } catch (e) {
      return followError.deleteFollow(e.message)
    }
  }
}

export default new FollowController()

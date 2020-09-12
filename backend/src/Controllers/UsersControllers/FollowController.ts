import { Request, Response } from 'express'

import SearchFollowModel from '../../model/UsersModel/SearchFollowModel'
import FollowModel from '../../model/UsersModel/FollowModel'
import UserModel from '../../model/UsersModel/UserModel'

import FollowError from '../../errors/FollowError'
import UserError from '../../errors/UserError'

class FollowController {
  private _searchFollowModel = (id: number, order: string, page: number) => new SearchFollowModel(id, order, page)
  private _followModel = new FollowModel()
  private _userModel = new UserModel()

  private _followError = new FollowError()
  private _userError = new UserError()

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

    const following_id = Number(followId)

    const ExistsUser = this._userModel.ReadWithWhereFirst({ id: following_id })

    if (!ExistsUser) {
      return res.status(this._userError.errorUserNotFound.status).json(this._userError.errorUserNotFound)
    }

    if (isNaN(following_id)) {
      return res.status(this._userError.errorInvalidUserId.status).json(this._userError.errorInvalidUserId)
    }

    if (userId === following_id) {
      return res.status(this._followError.errorCantFollow.status).json(this._followError.errorCantFollow)
    }

    const data = { user_id: userId, following_id }

    const isFollowing = await this._followModel.isFollow(data)

    if (isFollowing) {
      return res.status(this._followError.errorCantFollowAgain.status)
        .json(this._followError.errorCantFollowAgain)
    }

    try {
      const following = await this._followModel.createFollow(data)

      return res.json(following)
    } catch (e) {
      return res.status(this._followError.errorCreateNewFollow.status)
        .json(this._followError.errorCreateNewFollow)
    }
  }

  public destroy = async (req: Request, res: Response) => {
    const { userId } = req.userSession
    const { followId } = req.params

    const following_id = Number(followId)

    if (isNaN(following_id)) {
      return res.status(this._userError.errorInvalidUserId.status).json(this._userError.errorInvalidUserId)
    }

    if (userId === following_id) {
      return res.status(this._followError.errorCantUnFollow.status).json(this._followError.errorCantUnFollow)
    }

    const where = { user_id: userId, following_id }

    try {
      await this._followModel.deleteFollow(where)

      return res.send('')
    } catch (e) {
      return res.status(this._followError.errorDeleteFollow.status).json(this._followError.errorDeleteFollow)
    }
  }
}

export default new FollowController()

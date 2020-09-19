import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { IFollow, IFollowing } from '../../interfaces/IFollow'

class FollowModel extends SimpleCRUD {
  constructor () {
    super('following')
  }

  public isFollow = async (where: IFollow) => {
    const follow: IFollowing = await this.ReadWithWhereFirst(where)

    return follow
  }

  public createFollow = async (data: IFollow) => {
    const createFollow = await this.Create(data)

    return createFollow[0]
  }

  public deleteFollow = async (where: IFollow): Promise<void> => {
    await this.Delete(where)
  }
}

export default FollowModel

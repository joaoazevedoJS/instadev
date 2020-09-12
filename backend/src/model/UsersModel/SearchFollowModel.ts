import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { IFollowing, IFollowers } from '../../interfaces/IFollow'

class SearchFollowModel extends SimpleCRUD {
  constructor (public id: number, public order: string, public page: number) {
    super('following')

    if (!this.order) {
      this.order = 'asc'
    }
  }

  private ReadFollowPagination = async (column: string, select: Array<string>): Promise<any> => {
    const page = await knex('following')
      .where(column, this.id)
      .orderBy('id', this.order)
      .limit(10)
      .offset((this.page - 1) * 10)
      .select(select)

    return page
  };

  ReadUserFollowing = async () => {
    const select = ['id', 'user_id', 'following_id']

    const following: IFollowing = await this.ReadFollowPagination('user_id', select)

    return following
  };

  ReadUserFollowers = async () => {
    const select = ['id', 'following_id as user_id', 'user_id as followers_id']

    const followers: IFollowers = await this.ReadFollowPagination('following_id', select)

    return followers
  }
}

export default SearchFollowModel

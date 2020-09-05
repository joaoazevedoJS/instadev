import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

// eslint-disable-next-line no-unused-vars
import { IUserUpdate, IUserUpdateWhere } from '../../interfaces/IUser'

class UserModel extends SimpleCRUD {
  public async ReadUserCount (table: string, where: any) {
    const count = await knex(table).where(where).count().first()

    return count['count(*)']
  }

  public async ReadUser (id: number) {
    const user = await knex('users').select({
      name: 'name',
      user_name: 'user_name',
      privateAccount: 'privateAccount'
    }).where('id', id).first()

    return user
  }

  public async DeleteUser () {

  }

  public async UpdateUser (data: IUserUpdate, where: IUserUpdateWhere) {
    await super.Update('users', data, where)
  }
}

export default UserModel

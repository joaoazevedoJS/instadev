import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

// eslint-disable-next-line no-unused-vars
import { IUserUpdate, IUserUpdateWhere, IUserSelectUserDashBoard, IUserReturnUserDashBoard } from '../../interfaces/IUser'

class UserModel extends SimpleCRUD {
  public async ReadUserCount (table: string, where: object) {
    const count = await knex(table).where(where).count().first()

    return count['count(*)']
  }

  public async ReadUser (id: number) {
    const select: IUserSelectUserDashBoard = {
      name: 'name',
      user_name: 'user_name',
      privateAccount: 'privateAccount'
    }

    const user: IUserReturnUserDashBoard = await super.ReadReturnSelectWithWhereFirst('users', select, { id })

    return user
  }

  public async DeleteUser () {

  }

  public async UpdateUser (data: IUserUpdate, where: IUserUpdateWhere) {
    await super.Update('users', data, where)
  }
}

export default UserModel

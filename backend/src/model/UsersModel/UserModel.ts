import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import {
  IUserUpdate,
  IUserUpdateWhere,
  IUserReturnUserDashBoard
} from '../../interfaces/IUser'

class UserModel extends SimpleCRUD {
  constructor () { super('users') }

  public ReadUserWithSelect = async (id: number) => {
    const select: Array<string> = ['name', 'user_name', 'privateAccount']

    const user: IUserReturnUserDashBoard = await this.ReadReturnSelectWithWhereFirst(select, { id })

    return user
  }

  public DeleteUser = async () => { }

  public UpdateUser = async (data: IUserUpdate, where: IUserUpdateWhere) => {
    await this.Update(data, where)
  }
}

export default UserModel

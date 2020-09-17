import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import {
  IUser,
  IUserUpdate,
  IUserUpdateWhere,
  IUserReturnUserDashBoard
} from '../../interfaces/IUser'

class UserModel extends SimpleCRUD {
  constructor () { super('users') }

  public GetAccount = async (id: number) => {
    const user: IUser = await this.ReadWithWhereFirst({ id })

    user.password = undefined

    return user
  };

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

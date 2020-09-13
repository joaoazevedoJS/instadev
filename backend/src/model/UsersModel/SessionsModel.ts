import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { IUserCreateAccount, IUserReturnPassword } from '../../interfaces/IUser'

class SessionsModel extends SimpleCRUD {
  constructor () { super('users') }

  public getPassword = async (email: string) => {
    const user: IUserReturnPassword = await this.ReadReturnSelectWithWhereFirst(['id', 'password'], { email })

    return user
  }

  public existAccount = async (email: string, user_name: string) => {
    const user = await knex('users').where({ email }).orWhere({ user_name }).first()

    return user
  }

  public createAccount = async (data: IUserCreateAccount) => {
    const id = await this.Create(data)

    return id[0]
  }
}

export default SessionsModel

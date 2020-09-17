import SimpleCRUD from '../SimpleCRUD'

import { IUserReturnConfirmAccount, IUserUpdateConfirmAccount } from '../../interfaces/IUser'

class ConfirmAccountModel extends SimpleCRUD {
  constructor () { super('users') }

  public GetConfirmAccount = async (id: number) => {
    const select = ['accountCode as code', 'confirmAccount as confirm_account']

    const user: IUserReturnConfirmAccount = await this.ReadReturnSelectWithWhereFirst(select, { id })

    return user
  }

  public UpdateAccount = async (id: number) => {
    const data: IUserUpdateConfirmAccount = {
      confirmAccount: true
    }

    await this.Update(data, { id })
  }
}

export default ConfirmAccountModel

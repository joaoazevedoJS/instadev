import SimpleCRUD from '../SimpleCRUD'

// eslint-disable-next-line no-unused-vars
import { IUserSelectConfirmAccount, IUserUpdateConfirmAccount } from '../../interfaces/IUser'

class ConfirmAccountModel extends SimpleCRUD {
  public async GetAccount (id: number) {
    const select: IUserSelectConfirmAccount = {
      code: 'accountCode',
      confirm_account: 'confirmAccount'
    }

    const user: IUserSelectConfirmAccount = await super.ReadReturnSelectWithWhereFirst('users', select, { id })

    return user
  }

  public async UpdateAccount (id: number) {
    const data: IUserUpdateConfirmAccount = {
      confirmAccount: true
    }

    await super.Update('users', data, { id })
  }
}

export default ConfirmAccountModel

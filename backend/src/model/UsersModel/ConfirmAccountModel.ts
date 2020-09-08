import SimpleCRUD from '../SimpleCRUD'

class ConfirmAccountModel extends SimpleCRUD {
  public async GetAccount (id: number) {
    const select = {
      code: 'accountCode',
      confirm_account: 'confirmAccount'
    }

    return await super.ReadReturnSelectWithWhereFirst('users', select, { id })
  }

  public async UpdateAccount (id: number) {
    const data = {
      confirmAccount: true
    }

    await super.Update('users', data, { id })
  }
}

export default ConfirmAccountModel

import SimpleCRUD from '../SimpleCRUD'
import nowDateUTC from '../../utils/NowDateUTC'

// eslint-disable-next-line no-unused-vars
import { IUser, IUserSelectLimitResend, IUserUpdateLimitResend, IUserUpdateLimiteData, IUserReturnLimitResend } from '../../interfaces/IUser'

class ResendCodeModel extends SimpleCRUD {
  public async GetAccount (id: number) {
    const user: IUser = await super.ReadWithWhereFirst('users', { id })

    user.password = undefined

    return user
  }

  public async UpdateLimiteResend (id: number, limit: number) {
    const data: IUserUpdateLimitResend = {
      limit_resend: limit
    }

    await super.Update('users', data, { id })
  }

  public async UpdateLimiteData (id: number) {
    const dateUTC = nowDateUTC(3)

    const data: IUserUpdateLimiteData = {
      limit_date_resend: dateUTC
    }

    await super.Update('users', data, { id })
  }

  public async GetLimit (id: number) {
    const select: IUserSelectLimitResend = {
      limit_resend: 'limit_resend'
    }

    const limit: IUserReturnLimitResend = await super.ReadReturnSelectWithWhereFirst('users', select, { id })

    return limit
  }
}

export default ResendCodeModel

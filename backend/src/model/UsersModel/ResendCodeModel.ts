import SimpleCRUD from '../SimpleCRUD'
import nowDateUTC from '../../utils/NowDateUTC'

// eslint-disable-next-line no-unused-vars
import {
  IUser,
  IUserUpdateLimitResend,
  IUserUpdateLimiteData,
  IUserReturnLimitResend
} from '../../interfaces/IUser'

class ResendCodeModel extends SimpleCRUD {
  constructor () {
    super('users')
  }

  public GetAccount = async (id: number) => {
    const user: IUser = await this.ReadWithWhereFirst({ id })

    user.password = undefined

    return user
  };

  public UpdateLimiteResend = async (id: number, limit: number) => {
    const data: IUserUpdateLimitResend = {
      limit_resend: limit
    }

    await this.Update(data, { id })
  };

  public UpdateLimiteData = async (id: number) => {
    const dateUTC = nowDateUTC(3)

    const data: IUserUpdateLimiteData = {
      limit_date_resend: dateUTC
    }

    await this.Update(data, { id })
  };

  public GetLimit = async (id: number) => {
    const select = ['limit_resend']

    const limit: IUserReturnLimitResend = await this.ReadReturnSelectWithWhereFirst(select, { id })

    return limit
  };
}

export default ResendCodeModel

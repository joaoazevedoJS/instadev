import SimpleCRUD from '../SimpleCRUD'
import nowDateUTC from '../../utils/NowDateUTC'

import {
  IUserLimitResend,
  IUserUpdateLimiteData
} from '../../interfaces/IUser'

class ResendCodeModel extends SimpleCRUD {
  constructor (private id: number) {
    super('users')
  }

  public UpdateLimiteResend = async (limit_resend: number) => {
    const data: IUserLimitResend = { limit_resend }

    await this.Update(data, { id: this.id })
  };

  public UpdateLimiteData = async () => {
    const limit_date_resend = nowDateUTC(3)

    const data: IUserUpdateLimiteData = { limit_date_resend }

    await this.Update(data, { id: this.id })
  };

  public GetLimit = async () => {
    const select = ['limit_resend']

    const limit: IUserLimitResend = await this.ReadReturnSelectWithWhereFirst(select, { id: this.id })

    return limit
  };
}

export default ResendCodeModel

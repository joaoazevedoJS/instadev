import SimpleCRUD from '../SimpleCRUD'
import nowDateUTC from '../../utils/NowDateUTC'

class ResendCodeModel extends SimpleCRUD {
  public async GetAccount (id: number) {
    const user = await super.ReadWithWhereFirst('users', { id })

    user.password = undefined

    return user
  }

  public async Update_LimiteResend (id: number) {
    const data = {
      limit_resend: 0
    }

    return await super.Update('users', data, { id })
  }

  public async Update_LimiteData (id: number) {
    const dateUTC = nowDateUTC(3)

    const data = {
      limit_date_resend: dateUTC
    }

    return await super.Update('users', data, { id })
  }
}

export default ResendCodeModel

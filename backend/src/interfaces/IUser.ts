export interface IUser {
  id: number
  email: string
  user_name: string
  name: string
  password: string
  photo: string
  confirmAccount: string
  accountCode: string
  limit_resend: number
  limit_date_resend: string
  privateAccount: boolean
}

export interface IUserReturnUserDashBoard {
  name: string
  user_name: string
  privateAccount: boolean
}

export interface IUserReturnConfirmAccount {
  code: string,
  confirm_account: string
}

export interface IUserReturnLimitResend {
  limit_resend: number
}

export interface IUserUpdateLimitResend {
  limit_resend: number
}

export interface IUserUpdateLimiteData {
  limit_date_resend: String
}

export interface IUserUpdateConfirmAccount {
  confirmAccount: boolean
}

export interface IUserUpdate {
  privateAccount: boolean
}

export interface IUserUpdateWhere {
  id: number
}

export interface IWhereUserDelete {
  id: number,
  user_id: number
}

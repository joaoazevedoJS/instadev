export interface IUserCreateAccount {
  email: string
  user_name: string
  name: string
  password: string
  confirmAccount: boolean
  accountCode: string
  privateAccount: boolean
}

export interface IUser extends IUserCreateAccount {
  id: number
  photo: string
  limit_resend: number
  limit_date_resend: string
}

export interface IUserReturnPassword {
  id: number
  password: string
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

export interface IUserLimitResend {
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

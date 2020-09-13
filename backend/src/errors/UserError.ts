import Errors from './Errors'

import { Response } from 'express'

class UserError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorUserNotFound = this.FactoryErrors(404, 'User not Found')
  private _errorCodeNotExists = this.FactoryErrors(404, 'Code Not Exists! Verifed your code account!')
  private _errorUserNameMalformed = this.FactoryErrors(400, 'User_name Malformed')
  private _errorInvalidUserId = this.FactoryErrors(400, 'Invalid user ID')
  private _errorExistsAccount = this.FactoryErrors(409, 'E-mail or user_name exists, try again')
  private _errorInvalidPassword = this.FactoryErrors(401, 'Invalid password, try again!')

  private _errorUserUpdate = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while user update', catchMsg)

  private _errorUserCreateAccount = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while user update', catchMsg)

  public userNotFound = () => this.ResponseError(this._errorUserNotFound)
  public userUpdate = (catchMsg: string) => this.ResponseError(this._errorUserUpdate(catchMsg))
  public codeNotExists = () => this.ResponseError(this._errorCodeNotExists)
  public userNameMalformed = () => this.ResponseError(this._errorUserNameMalformed)
  public invalidUserId = () => this.ResponseError(this._errorInvalidUserId)
  public existsAccount = () => this.ResponseError(this._errorExistsAccount)
  public userCreateAccount = (catchMsg: string) => this.ResponseError(this._errorUserCreateAccount(catchMsg))
  public invalidPassword = () => this.ResponseError(this._errorInvalidPassword)
}

export default UserError

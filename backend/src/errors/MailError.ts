import Errors from './Errors'

import { Response } from 'express'

class MailError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorMailNotVerified = this.FactoryErrors(401, 'E-mail not Verified')
  private _errorMailAlreadyVerified = this.FactoryErrors(409, 'E-mail has already been verified')
  private _errorLimitResend = this.FactoryErrors(401, 'Maximum limit of resending e-mail')

  private _errorWhileSendMail = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while send mail', catchMsg)

  public mailNotVerified = () => this.ResponseError(this._errorMailNotVerified)
  public mailAlreadyVerified = () => this.ResponseError(this._errorMailAlreadyVerified)
  public limitResend = () => this.ResponseError(this._errorLimitResend)
  public whileSendMail = (catchMsg: string) => this.ResponseError(this._errorWhileSendMail(catchMsg))
}

export default MailError

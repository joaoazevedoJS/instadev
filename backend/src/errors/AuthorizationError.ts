import Errors from './Errors'

import { Response } from 'express'

class AuthorizationError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorNoTokenProvided = this.FactoryErrors(401, 'No Token Provided')
  private _errorTokenMalformed = this.FactoryErrors(401, 'Token Malformed')
  private _errorTokenInvalid = this.FactoryErrors(401, 'Token Invalid')

  public noTokenProvided = () => this.ResponseError(this._errorNoTokenProvided)
  public tokenMalformed = () => this.ResponseError(this._errorTokenMalformed)
  public tokenInvalid = () => this.ResponseError(this._errorTokenInvalid)
}

export default AuthorizationError

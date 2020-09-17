import { Response } from 'express'

import { IErrors } from '../interfaces/IErrors'

class Errors {
  // eslint-disable-next-line no-useless-constructor
  constructor (protected response: Response) {}

  protected FactoryErrors = (status: number, message: string, catchMessage?: string): IErrors => {
    return catchMessage
      ? { status, message, catchMessage }
      : { status, message }
  }

  protected ResponseError = (error: IErrors): Response<IErrors> => {
    return this.response.status(error.status).json(error)
  }

  private _errorDontAuthorization = this.FactoryErrors(401, 'Don\'t have authorization')

  public dontAuthorization = () => this.ResponseError(this._errorDontAuthorization)
}

export default Errors

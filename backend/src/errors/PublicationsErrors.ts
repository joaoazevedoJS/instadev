import Errors from './Errors'

import { Response } from 'express'

class PublicationsError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorPublicationNotFound = this.FactoryErrors(404, 'Publication not Found')

  private _errorInCreatePublication = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while creating new publication', catchMsg)

  private _errorInDeletePublication = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while delete publication', catchMsg)

  private _errorUpdatePublication = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while update publication, try again!', catchMsg)

  public publicationNotFound = () => this.ResponseError(this._errorPublicationNotFound)
  public createPublication = (catchMsg: string) => this.ResponseError(this._errorInCreatePublication(catchMsg))
  public deletePublication = (catchMsg: string) => this.ResponseError(this._errorInDeletePublication(catchMsg))
  public updatePublication = (catchMsg: string) => this.ResponseError(this._errorUpdatePublication(catchMsg))
}

export default PublicationsError

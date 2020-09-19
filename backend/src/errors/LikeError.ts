import Errors from './Errors'

import { Response } from 'express'

class FollowError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorAlreadyLiked = this.FactoryErrors(401, 'you can\'t liked again')

  private _errorCreateNewLike = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while create a new Like', catchMsg)

  private _errorDeleteLike = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while delete the Like', catchMsg)

  public alreadyLiked = () => this.ResponseError(this._errorAlreadyLiked)
  public createNewLike = (catchMsg: string) => this.ResponseError(this._errorCreateNewLike(catchMsg))
  public deleteLike = (catchMsg: string) => this.ResponseError(this._errorDeleteLike(catchMsg))
}

export default FollowError

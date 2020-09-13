import Errors from './Errors'

import { Response } from 'express'

class FollowError extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorCantFollow = this.FactoryErrors(401, "You can't following you")
  private _errorCantUnFollow = this.FactoryErrors(401, "You can't unfollowing you")
  private _errorCantFollowAgain = this.FactoryErrors(401, "You can't following again")

  private _errorCreateNewFollow = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while create a new follow', catchMsg)

  private _errorDeleteFollow = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while delete the follow', catchMsg)

  public cantFollow = () => this.ResponseError(this._errorCantFollow)
  public cantUnFollow = () => this.ResponseError(this._errorCantUnFollow)
  public cantFollowAgain = () => this.ResponseError(this._errorCantFollowAgain)
  public createNewFollow = (catchMsg: string) => this.ResponseError(this._errorCreateNewFollow(catchMsg))
  public deleteFollow = (catchMsg: string) => this.ResponseError(this._errorDeleteFollow(catchMsg))
}

export default FollowError

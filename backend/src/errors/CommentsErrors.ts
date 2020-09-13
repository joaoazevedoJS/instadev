import Errors from './Errors'

import { Response } from 'express'

class CommentsErros extends Errors {
  constructor (protected response: Response) {
    super(response)
  }

  private _errorMessageNoContent = this.FactoryErrors(400, 'Message no content')
  private _errorCommentaryNotFound = this.FactoryErrors(404, 'Commentary not Found')

  private _errorInCreateCommentary = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while creating new commentary', catchMsg)

  private _errorInDeleteCommentary = (catchMsg: string) =>
    this.FactoryErrors(400, 'Unexpected error while delete commentary', catchMsg)

  public messageNoContent = () => this.ResponseError(this._errorMessageNoContent)
  public commentaryNotFound = () => this.ResponseError(this._errorCommentaryNotFound)
  public createCommentary = (catchMsg: string) => this.ResponseError(this._errorInCreateCommentary(catchMsg))
  public deleteCommentary = (catchMsg: string) => this.ResponseError(this._errorInDeleteCommentary(catchMsg))
}

export default CommentsErros

import SimpleCRUD from '../SimpleCRUD'

import { ICreateCommentaryOfComments, ICommentWhere, ICommentaryOfComments } from '../../interfaces/IComments'

import LikesCommentaryOfCommentsModel from '../LikesModel/LikesCommentaryOfCommentsModel'

class CommentaryOfCommentsModel extends SimpleCRUD {
  private _likes = new LikesCommentaryOfCommentsModel()
  constructor () { super('commentary_comments') }

  public CreateCommentary = async (data: ICreateCommentaryOfComments) => {
    const createData = await this.Create(data)

    return createData[0]
  }

  public existsCommentary = async (id: number) => {
    const existsCommentary: ICommentaryOfComments = await this.ReadWithWhereFirst({ id })

    return existsCommentary
  }

  public DeleteCommentary = async (where: ICommentWhere) => {
    this._likes.Delete({ commentary_comments_id: where.id })
    await this.Delete(where)
  }
}

export default CommentaryOfCommentsModel

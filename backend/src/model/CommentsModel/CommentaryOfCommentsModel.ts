import SimpleCRUD from '../SimpleCRUD'

import { ICreateCommentaryOfComments, ICommentWhere, ICommentaryOfComments } from '../../interfaces/IComments'

class CommentaryOfCommentsModel extends SimpleCRUD {
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
    await this.Delete(where)
  }
}

export default CommentaryOfCommentsModel

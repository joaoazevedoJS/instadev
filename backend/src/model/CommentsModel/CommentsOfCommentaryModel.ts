import SimpleCRUD from '../SimpleCRUD'

import CommentsErros from '../../errors/CommentsErrors'

// eslint-disable-next-line no-unused-vars
import { IWhereUserDelete } from '../../interfaces/IWhere'

class CommentsOfCommentaryModel extends SimpleCRUD {
  public async CreateCommentary (data: any) {
    const createData = await super.Create('comments_comment', data)

    return createData
  }

  public async DeleteCommentary (where: IWhereUserDelete) {
    const searchCommentary = await super.ReadWithWhereFirst('comments_comment', where)

    const { errorCommentaryNotFound } = new CommentsErros()

    if (!searchCommentary) return errorCommentaryNotFound

    await super.Delete('comments_comment', where)

    return false
  }
}

export default CommentsOfCommentaryModel

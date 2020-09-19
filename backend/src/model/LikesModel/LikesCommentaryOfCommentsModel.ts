import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { ILikeCommentaryOfComments, ILikeWhereCommentaryOfComments, ICreateLikeCommentaryOfComments } from '../../interfaces/ILikes'

class LikesPublicationsModel extends SimpleCRUD {
  constructor () { super('commentary_comments_likes') }

  public CreateCommentaryLike = async (data: ICreateLikeCommentaryOfComments) => {
    const id = await this.Create(data)

    return id[0]
  }

  public getLike = async (where: ILikeWhereCommentaryOfComments) => {
    const commentaryLike: ILikeCommentaryOfComments = await this.ReadWithWhereFirst(where)

    return commentaryLike
  }

  public deleteCommentaryLike = async (where: ILikeWhereCommentaryOfComments) => {
    await this.Delete(where)
  }
}

export default LikesPublicationsModel

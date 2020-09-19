import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { ILikeComments, ILikeWhereComments, ICreateLikeComments } from '../../interfaces/ILikes'

class LikesCommentsModel extends SimpleCRUD {
  constructor () { super('comments_likes') }

  public CreateCommentsLike = async (data: ICreateLikeComments) => {
    const id = await this.Create(data)

    return id[0]
  }

  public getLike = async (where: ILikeWhereComments) => {
    const commentsLike: ILikeComments = await this.ReadWithWhereFirst(where)

    return commentsLike
  }

  public deleteCommentsLike = async (where: ILikeWhereComments) => {
    await this.Delete(where)
  }
}

export default LikesCommentsModel

import knex from '../../database/connection'

import SimpleCRUD from '../SimpleCRUD'

import { ILike, ICreateLike, ILikeWhere } from '../../interfaces/ILikes'

class LikesPublicationsModel extends SimpleCRUD {
  constructor () { super('publications_likes') }

  public CreatePublicationLike = async (data: ICreateLike) => {
    const id = await this.Create(data)

    return id[0]
  }

  public getLike = async (where: ILikeWhere) => {
    const publicationLike: ILike = await this.ReadWithWhereFirst(where)

    return publicationLike
  }

  public getPublicationLikes = async (publication_id: number) => {
    const like = await this.ReadWithWhere({ publication_id })

    return like
  }

  public deletePublicationLike = async (where: ILikeWhere) => {
    await this.Delete(where)
  }
}

export default LikesPublicationsModel

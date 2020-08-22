import knex from '../database/connection'

import { IWhere } from '../interfaces/IPublications'
import PublicationsErrors from '../errors/PublicationsErrors'
import SimpleCRUD from './SimpleCRUD'

class PublicationsModel extends SimpleCRUD {
  public async CreateUserPublication (data: any) {
    const createData = await super.Create('publications', data)

    return createData
  }

  public async ReadUserPublication (id: number, page: number = 0) {
    const publications = await knex('publications')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .where('publications.user_id', id)
      .select('publications.*')
      .groupBy('publications.id')
      .orderBy('publications.date', 'desc')
      .count('publications_likes.publication_id as likes')
      .limit(20)
      .offset((page - 1) * 20)

    return publications
  }

  public async DeleteUserPublication (where: IWhere) {
    const searchPublication = await super.Read('publications', where, true)

    const { errorInSearchPublication } = new PublicationsErrors()

    if (!searchPublication) return errorInSearchPublication

    await super.Delete('publications', where)

    return false
  }
}

export default PublicationsModel

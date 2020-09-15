import { QueryBuilder } from 'knex'
import knex from '../../database/connection'

import { IUserPublications, IExplorerPublications } from '../../interfaces/IPublications'

class SearchPublications {
  constructor (private page: number, private order?: string) {
    if (!this.order) {
      this.order = 'asc'
    }
  }

  public GlobalPublications = async () => {
    const publications: Array<IExplorerPublications> = await knex('publications')
      .modify(this.setJoinUser)
      .modify(this.setJoinPublicationLike)
      .modify(this.setGroupBy)
      .modify(this.setOrderTableWithLike)
      .modify(this.setSelectPublicationsExplorer)
      .modify(this.setCountLike)
      .modify(this.setOffset)

    return publications
  }

  public HomePublications = async (following_id: number) => {
    const publications = await knex('publications')
      .modify(this.setJoinUser)
      .join('following', 'following.following_id', '=', 'publications.user_id')
      .modify(this.setJoinPublicationLike)
      .where('following.user_id', following_id)
      .modify(this.setSelectPublicationsExplorer)
      .modify(this.setGroupBy)
      .modify(this.setOrderTable)
      .modify(this.setCountLike)
      .modify(this.setOffset)

    return publications
  }

  public UserPublications = async (id: number) => {
    const publications: Array<IUserPublications> = await knex('publications')
      .modify(this.setJoinPublicationLike)
      .where('publications.user_id', id)
      .modify(this.setSelectPublication)
      .modify(this.setGroupBy)
      .modify(this.setOrderTable)
      .modify(this.setCountLike)
      .modify(this.setOffset)

    return publications
  }

  private setJoinPublicationLike = (table: QueryBuilder) => {
    table.leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
  }

  private setJoinUser = (table: QueryBuilder) => {
    table.join('users', 'users.id', '=', 'publications.user_id')
  }

  private setOffset = (table: QueryBuilder) => {
    const limit = 20

    table.limit(limit)
    table.offset((this.page - 1) * limit)
  }

  private setGroupBy = (table: QueryBuilder) => {
    table.groupBy('publications.id')
  }

  private setOrderTable = (table: QueryBuilder) => {
    table.orderBy('publications.created_at', this.order)
  }

  private setOrderTableWithLike = (table: QueryBuilder) => {
    table.orderBy('likes', this.order)
    this.setOrderTable(table)
  }

  private setCountLike = (table: QueryBuilder) => {
    table.count('publications_likes.publication_id as likes')
  }

  private setSelectPublication = (table: QueryBuilder) => {
    table.select('publications.*')
  }

  private setSelectPublicationsExplorer = (table: QueryBuilder) => {
    this.setSelectPublication(table)
    table.select('users.user_name')
  }
}

export default SearchPublications

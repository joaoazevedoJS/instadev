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
      .join('users', 'users.id', '=', 'publications.user_id')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .count('publications_likes.publication_id as likes')
      .orderBy('likes', this.order)
      .orderBy('publications.date', this.order)
      .limit(20)
      .offset((this.page - 1) * 20)

    return publications
  }

  public HomePublications = async (following_id: number) => {
    const publications = await knex('publications')
      .join('users', 'users.id', '=', 'publications.user_id')
      .join('following', 'following.following_id', '=', 'publications.user_id')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .where('following.user_id', following_id)
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .orderBy('publications.date', this.order)
      .count('publications_likes.publication_id as likes')
      .limit(20)
      .offset((this.page - 1) * 20)

    return publications
  }

  public UserPublications = async (id: number) => {
    const publications: Array<IUserPublications> = await knex('publications')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .where('publications.user_id', id)
      .select('publications.*')
      .groupBy('publications.id')
      .orderBy('publications.date', this.order)
      .count('publications_likes.publication_id as likes')
      .limit(20)
      .offset((this.page - 1) * 20)

    return publications
  }
}

export default SearchPublications

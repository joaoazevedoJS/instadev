/* eslint-disable camelcase */
import knex from '../../database/connection'

class SearchPublications {
  public async GlobalPublications (page: number) {
    const publications = await knex('publications')
      .join('users', 'users.id', '=', 'publications.user_id')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .count('publications_likes.publication_id', { as: 'likes' })
      .orderBy('likes', 'desc')
      .orderBy('publications.date', 'desc')
      .limit(20)
      .offset((page - 1) * 20)

    return publications
  }

  public async HomePublications (following_id: number, page: number) {
    const publications = await knex('publications')
      .join('users', 'users.id', '=', 'publications.user_id')
      .join('following', 'following.following_id', '=', 'publications.user_id')
      .leftJoin('publications_likes', 'publications_likes.publication_id', '=', 'publications.id')
      .where('following.user_id', following_id)
      .groupBy('publications.id')
      .select('publications.*')
      .select('users.user_name')
      .orderBy('publications.date', 'desc')
      .count('publications_likes.publication_id', { as: 'likes' })
      .limit(20)
      .offset((page - 1) * 20)

    return publications
  }
}

export default SearchPublications

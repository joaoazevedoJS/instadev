import knex from '../database/connection'

async function UpdateLike (PublicationId: number) {
  const [likes] = await knex('public_likes')
    .where('publication_id', Number(PublicationId)).count()

  await knex('publications')
    .where('id', PublicationId)
    .update({
      likes: Number(likes['count(*)'])
    })
}

export default UpdateLike

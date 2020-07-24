// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('public_likes', table => {
    table.increments('id').primary()

    table.integer('publication_id')
      .notNullable()
      .references('id').inTable('publications')

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('public_likes')
}

// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('comments_likes', table => {
    table.increments('id').primary()

    table.integer('comments_id')
      .notNullable()
      .references('id').inTable('publications_comments')

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('comments_likes')
}

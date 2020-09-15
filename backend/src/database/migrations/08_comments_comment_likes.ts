// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('comments_comment_likes', table => {
    table.increments('id').primary()
    table.date('created_at').notNullable()

    table.integer('comments_comment_id')
      .notNullable()
      .references('id').inTable('comments_comment')

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('comments_comment_likes')
}

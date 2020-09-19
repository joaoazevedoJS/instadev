// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('publications_comments', table => {
    table.increments('id').primary()

    table.string('message').notNullable()

    table.integer('publication_id')
      .notNullable()
      .references('id').inTable('publications')

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')

    table.date('created_at').notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('publications_comments')
}

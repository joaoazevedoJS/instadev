// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('following', table => {
    table.increments('id').primary()

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')

    table.integer('following_id')
      .notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('following')
}

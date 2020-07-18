// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('followers', table => {
    table.increments('id').primary()

    table.integer('user_id')
      .notNullable()
      .references('id').inTable('users')

    table.integer('followers_id')
      .notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('followers')
}

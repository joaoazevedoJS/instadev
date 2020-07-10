// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('user')
}

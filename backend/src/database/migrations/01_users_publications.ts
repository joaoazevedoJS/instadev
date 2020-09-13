// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('publications', table => {
    table.increments('id').primary()
    table.string('photo').notNullable()
    table.string('description')
    table.integer('views')
    table.date('date').notNullable()

    table.integer('user_id').notNullable()
      .references('id').inTable('users')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('publications')
}

// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('email').notNullable().unique()
    table.string('user_name').notNullable().unique()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.string('photo')
    table.integer('following')
    table.integer('followers')
    table.integer('publications')
    table.boolean('confirmAccount')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('users')
}

import Knex, { SchemaBuilder } from 'knex';

export async function up(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.createTable('publications', table => {
    table.increments('id').primary();
    table.string('photo').notNullable();
    table.string('description');
    table.integer('views');
    table.date('created_at').notNullable();

    table.integer('user_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.dropTable('publications');
}

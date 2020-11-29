import Knex, { SchemaBuilder } from 'knex';

export async function up(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.createTable('publications_likes', table => {
    table.increments('id').primary();
    table.date('created_at').notNullable();

    table
      .integer('publication_id')
      .notNullable()
      .references('id')
      .inTable('publications');

    table.integer('user_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.dropTable('publications_likes');
}

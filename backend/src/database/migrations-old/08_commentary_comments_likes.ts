import Knex, { SchemaBuilder } from 'knex';

export async function up(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.createTable('commentary_comments_likes', table => {
    table.increments('id').primary();
    table.date('created_at').notNullable();

    table
      .integer('commentary_comments_id')
      .notNullable()
      .references('id')
      .inTable('commentary_comments');

    table.integer('user_id').notNullable().references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.dropTable('commentary_comments_likes');
}

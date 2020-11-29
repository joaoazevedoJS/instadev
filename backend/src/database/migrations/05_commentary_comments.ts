import Knex, { SchemaBuilder } from 'knex';

export async function up(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.createTable('commentary_comments', table => {
    table.increments('id').primary();

    table.string('message').notNullable();

    table.integer('user_id').notNullable().references('id').inTable('users');

    table
      .integer('comment_id')
      .notNullable()
      .references('id')
      .inTable('publications_comments');

    table.date('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<SchemaBuilder> {
  return knex.schema.dropTable('commentary_comments');
}

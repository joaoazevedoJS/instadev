import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Users1607987622921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'user_avatar',
            type: 'varchar',
          },
          {
            name: 'verified_account',
            type: 'bool',
            default: false,
          },
          {
            name: 'verification_code',
            type: 'varchar',
          },
          {
            name: 'mail_resend_count',
            type: 'integer',
            default: 0,
          },
          {
            name: 'mail_limit_date_resend',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'private_account',
            type: 'bool',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

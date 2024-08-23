import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserTable1719334002149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)

    await queryRunner.query(`
            CREATE TABLE "user" (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              isadmin BOOLEAN NOT null,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePostTable1719840902989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE post (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              title VARCHAR(255) NOT NULL,
              content TEXT NOT NULL,
              user_id UUID NOT NULL,
              created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES "user"(id)
            );
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE post`)
  }
}

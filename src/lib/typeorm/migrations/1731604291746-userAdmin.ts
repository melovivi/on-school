import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserAdmin1731604291746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO public."user" (name, email, password, isadmin) 
            VALUES ('admin', 'admin@example.com', '$2a$08$svLzXILKSKqHweCYK6RAAOy0YPExLbIHJaZWcwf19Bu5FiCL7EEw6', true)
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM public.user WHERE email = 'admin@example.com'
        `)
  }
}

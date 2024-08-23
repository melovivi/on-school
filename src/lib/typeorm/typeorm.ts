import { Post } from '@/entities/post.entity'
import { User } from '@/entities/user.entity'
import { env } from '@/env'
import { DataSource } from 'typeorm'
import { CreateUserTable1719334002149 } from './migrations/1719334002149-createUserTable'
import { CreatePostTable1719840902989 } from './migrations/1719840902989-createPostTable'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [User, Post],
  migrations: [CreateUserTable1719334002149, CreatePostTable1719840902989],
  logging: env.NODE_ENV === 'development',
})

appDataSource
  .initialize()
  .then(() => {
    console.log('Database with typeorm connected')
  })
  .catch((error) => {
    console.error(`Error connecting to database with typeorm:`, error)
  })

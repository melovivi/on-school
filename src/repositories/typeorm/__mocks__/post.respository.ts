import { IPost } from '@/entities/models/post.interface'
import { Post } from '@/entities/post.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Like, Repository } from 'typeorm'
import { IPostRepository } from '../../post.repository.interface'
import { User } from '@/entities/user.entity'
import { hash } from 'bcryptjs'

export class PostRepository {
  constructor() {}

  async create(post: IPost): Promise<IPost> {
    const hashedPassword = await hash('123', 8)
    return {
      title: 'titulo',
      content: 'content',
      author: {
        name: 'Usuario',
        email: '123',
        password: hashedPassword,
        isadmin: true,
        posts: [],
        createdAt: new Date(),
      },
    }
  }

  async findById(id: string): Promise<IPost | undefined> {
    const hashedPassword = await hash('123', 8)
    const posts = [
      {
        id: '1',
        title: 'titulo',
        content: 'content',
        author: {
          name: 'Usuario',
          email: '123',
          password: hashedPassword,
          isadmin: true,
          posts: [],
          createdAt: new Date(),
        },
      },
    ]
    return posts.find((post) => {
      return post.id === id
    })
  }

  async findAll(page: number, limit: number): Promise<IPost[]> {
    const hashedPassword = await hash('123', 8)
    return [
      {
        title: 'titulo',
        content: 'content',
        author: {
          name: 'Usuario',
          email: '123',
          password: hashedPassword,
          isadmin: true,
          posts: [],
          createdAt: new Date(),
        },
      },
    ]
  }

  async searchByWord(
    page: number,
    limit: number,
    keyword: string,
  ): Promise<IPost[]> {
    const hashedPassword = await hash('123', 8)
    return [
      {
        title: 'titulo',
        content: 'content',
        author: {
          name: 'Usuario',
          email: '123',
          password: hashedPassword,
          isadmin: true,
          posts: [],
          createdAt: new Date(),
        },
      },
    ]
  }

  async update(post: IPost): Promise<IPost> {
    const hashedPassword = await hash('123', 8)
    return {
      title: 'titulo',
      content: 'content',
      author: {
        name: 'Usuario',
        email: '123',
        password: hashedPassword,
        isadmin: true,
        posts: [],
        createdAt: new Date(),
      },
    }
  }

  async delete(id: string): Promise<void> {}
}

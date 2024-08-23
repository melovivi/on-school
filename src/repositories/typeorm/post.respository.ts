import { IPost } from '@/entities/models/post.interface'
import { Post } from '@/entities/post.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Like, Repository } from 'typeorm'
import { IPostRepository } from '../post.repository.interface'
import { User } from '@/entities/user.entity'

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>
  private userRepository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
    this.userRepository = appDataSource.getRepository(User)
  }

  async create(post: IPost): Promise<IPost> {
    return await this.repository.save(post)
  }

  async findById(id: string): Promise<IPost | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['author'],
    })
  }

  async findAll(page: number, limit: number): Promise<IPost[]> {
    return await this.repository.find({
      take: limit,
      skip: page * limit,
      relations: ['author'],
    })
  }

  async searchByWord(
    page: number,
    limit: number,
    keyword: string,
  ): Promise<IPost[]> {
    return await this.repository.find({
      take: limit,
      skip: page * limit,
      where: [
        { title: Like(`%${keyword}%`) },
        { content: Like(`%${keyword}%`) },
      ],
    })
  }

  async update(post: IPost): Promise<IPost> {
    return await this.repository.save(post)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

import { Post } from '@/entities/post.entity'
import { PostRepository } from '@/repositories/typeorm/post.respository'

export class FindAllPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async handler(page: number, limit: number): Promise<Post[]> {
    return await this.postRepository.findAll(page, limit)
  }
}

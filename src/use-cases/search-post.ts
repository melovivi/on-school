import { Post } from '@/entities/post.entity'
import { IPostRepository } from '@/repositories/post.repository.interface'

export class SearchPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(page: number, limit: number, keyword: string): Promise<Post[]> {
    return this.postRepository.searchByWord(page, limit, keyword)
  }
}

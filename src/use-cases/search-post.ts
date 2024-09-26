import { Post } from '@/entities/post.entity'
import { IPostRepository } from '@/repositories/post.repository.interface'

export class SearchPostUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(page: number, limit: number, keyword: string): Promise<{ data: Post[], pagination: { totalItems: number, totalPages: number, currentPage: number }}> {
    return this.postRepository.searchByWord(page, limit, keyword)
  }
}

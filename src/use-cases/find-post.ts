import { IPostRepository } from '@/repositories/post.repository.interface'
import { IPost } from '@/entities/models/post.interface'

export class FindPostUseCase {
  constructor(private repository: IPostRepository) {}

  async handler(id: string): Promise<IPost | null> {
    return this.repository.findById(id)
  }
}

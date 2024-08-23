import { PostRepository } from '@/repositories/typeorm/post.respository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async handler(id: string): Promise<void> {
    const post = await this.postRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError('Post')
    }

    await this.postRepository.delete(id)
  }
}

import { PostRepository } from '@/repositories/typeorm/post.respository'
import { FindAllPostUseCase } from '../find-all-post'

export function makeFindAllPostUseCase() {
  const postRepository = new PostRepository()
  const findAllPostUseCase = new FindAllPostUseCase(postRepository)
  return findAllPostUseCase
}

import { PostRepository } from '@/repositories/typeorm/post.respository'
import { SearchPostUseCase } from '../search-post'

export function makeSearchPostUseCase() {
  const postRepository = new PostRepository()
  const searchPostUseCase = new SearchPostUseCase(postRepository)
  return searchPostUseCase
}

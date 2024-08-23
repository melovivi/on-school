import { PostRepository } from '@/repositories/typeorm/post.respository'
import { CreatePostUseCase } from '../create-post'

export function makeCreatePostUseCase() {
  const postRepository = new PostRepository()
  const makeCreatePostUseCase = new CreatePostUseCase(postRepository)
  return makeCreatePostUseCase
}

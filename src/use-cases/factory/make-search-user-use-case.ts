import { UserRepository } from '@/repositories/typeorm/user.repository'
import { SearchUserUseCase } from '../search-user'

export function makeSearchUserUseCase() {
  const userRepository = new UserRepository()
  const searchUserUseCase = new SearchUserUseCase(userRepository)
  return searchUserUseCase
}

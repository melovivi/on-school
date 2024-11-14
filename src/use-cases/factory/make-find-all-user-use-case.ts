import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindAllUserUseCase } from '../find-all-user'

export function makeFindAllUserUseCase() {
  const userRepository = new UserRepository()
  const findAllUserUseCase = new FindAllUserUseCase(userRepository)
  return findAllUserUseCase
}

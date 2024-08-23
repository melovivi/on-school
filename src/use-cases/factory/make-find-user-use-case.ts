import { UserRepository } from '@/repositories/typeorm/user.repository'
import { FindUserUseCase } from '../find-user'

export function makeFindUserUseCase() {
  const userRepository = new UserRepository()
  const findUserUseCase = new FindUserUseCase(userRepository)
  return findUserUseCase
}

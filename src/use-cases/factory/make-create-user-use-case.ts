import { UserRepository } from '@/repositories/typeorm/user.repository'
import { CreateUserCase } from '../create-user'

export function makeCreateUserUseCase() {
  const userRepository = new UserRepository()
  const makeCreateUserUseCase = new CreateUserCase(userRepository)
  return makeCreateUserUseCase
}

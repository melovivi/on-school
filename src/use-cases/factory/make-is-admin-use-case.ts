import { UserRepository } from '@/repositories/typeorm/user.repository'
import { IsAdmin } from '../is-admin'

export function makeIsAdminUseCase() {
  const userRepository = new UserRepository()
  const isAdminUseCase = new IsAdmin(userRepository)
  return isAdminUseCase
}

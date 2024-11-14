import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(
    isadmin: boolean,
    page: number,
    limit: number,
  ): Promise<User[]> {
    return await this.userRepository.findAll(isadmin, page, limit)
  }
}

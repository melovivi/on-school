import { IUser } from '@/entities/models/user.interface'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id)
  }
}

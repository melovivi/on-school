import { IUserRepository } from '@/repositories/user.repository.interface'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError('User')
    }
    await this.userRepository.delete(id)
  }
}

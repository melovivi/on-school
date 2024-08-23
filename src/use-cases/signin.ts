import { IUserRepository } from '@/repositories/user.repository.interface'

export class SigninUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(email: string) {
    return await this.userRepository.findByEmail(email)
  }
}

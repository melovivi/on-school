import { IUserRepository } from '@/repositories/user.repository.interface'

export class IsAdmin {
  constructor(private readonly userRepository: IUserRepository) {}

  async handler(email: string) {
    const user = await this.userRepository.findByEmail(email)
    return user?.isadmin
  }
}

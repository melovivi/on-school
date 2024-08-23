import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class CreateUserCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(
    name: string,
    email: string,
    password: string,
    isadmin: boolean,
  ): Promise<User | undefined> {
    return this.userRepository.create(name, email, password, isadmin)
  }
}

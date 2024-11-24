import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class SearchUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(page: number, limit: number, keyword: string): Promise<{ data: User[], pagination: { totalItems: number, totalPages: number, currentPage: number }}> {
    return this.userRepository.searchByWord(page, limit, keyword)
  }
}

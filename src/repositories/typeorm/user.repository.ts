import { IUser } from '@/entities/models/user.interface'
import { IUserRepository } from '../user.repository.interface'
import { Repository } from 'typeorm'
import { User } from '@/entities/user.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { UUID } from 'crypto'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(User)
  }

  async create(
    name: string,
    email: string,
    password: string,
    isadmin: boolean,
  ): Promise<IUser | undefined> {
    return await this.repository.save({ name, email, password, isadmin })
  }

  async findById(id: UUID): Promise<IUser | null> {
    return await this.repository.findOne({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({
      where: { email },
    })
  }

  async findAll(
    isadmin: boolean,
    page: number,
    limit: number,
  ): Promise<IUser[]> {
    return await this.repository.find({
      where: { isadmin },
      skip: page,
      take: limit,
    })
  }

  async delete(id: UUID): Promise<void> {
    await this.repository.delete(id)
  }

  async update(user: IUser): Promise<IUser> {
    await this.repository.save(user)
    return user
  }
}

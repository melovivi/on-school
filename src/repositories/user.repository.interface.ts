import { IUser } from '@/entities/models/user.interface'

export interface IUserRepository {
  create(
    name: string,
    email: string,
    password: string,
    isadmin: boolean,
  ): Promise<IUser | undefined>

  findById(id: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
}

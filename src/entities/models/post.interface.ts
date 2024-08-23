import { User } from '../user.entity'

export interface IPost {
  id?: string
  title: string
  content: string
  author: User
  createdAt?: Date
  updatedAt?: Date
}

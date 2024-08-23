import { Post } from '../post.entity'

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  isadmin: boolean
  posts: Post[]
  createdAt: Date
  updatedAt?: Date
}

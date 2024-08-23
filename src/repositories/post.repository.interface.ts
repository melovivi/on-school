import { IPost } from '@/entities/models/post.interface'

export interface IPostRepository {
  create(post: IPost): Promise<IPost>
  findById(id: string): Promise<IPost | null>
  findAll(page: number, limit: number): Promise<IPost[]>
  update(post: IPost): Promise<IPost>
  delete(id: string): Promise<void>
  searchByWord(page: number, limit: number, word: string): Promise<IPost[]>
}

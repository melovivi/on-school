import { FastifyInstance } from 'fastify'
import { create } from './create'
import { signin } from './signin'
import { find } from './find'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', create)
  app.post('/user/signin', signin)
  app.get('/user/me', find)
}

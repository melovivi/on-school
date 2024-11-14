import { FastifyInstance } from 'fastify'
import { create } from './create'
import { signin } from './signin'
import { find } from './find'
import { findAll } from './find-all'
import { update } from './update'
import { deleteUser } from './delete'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', create)
  app.post('/user/signin', signin)
  app.get('/user/me', find)
  app.get('/user', findAll)
  app.put('/user/:id', update)
  app.delete('/user/:id', deleteUser)
}

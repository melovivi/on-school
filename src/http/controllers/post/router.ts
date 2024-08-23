import { FastifyInstance } from 'fastify'
import { create } from './create'
import { update } from './update'
import { deletePost } from './delete'
import { find } from './find'
import { findAll } from './find-all'
import { search } from './search'
import { findAllAdmin } from './find-all-admin'

export async function postRoutes(app: FastifyInstance) {
  app.post('/post', create)
  app.put('/post/:id', update)
  app.get('/post/:id', find)
  app.get('/post', findAll)
  app.get('/post/search', search)
  app.get('/post/admin', findAllAdmin)
  app.delete('/post/:id', deletePost)
}

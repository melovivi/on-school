import { makeFindAllPostUseCase } from '@/use-cases/factory/make-find-all-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
  })
  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAllPostUseCase = makeFindAllPostUseCase()
  const posts = await findAllPostUseCase.handler(page, limit)

  return reply.status(200).send(posts)
}

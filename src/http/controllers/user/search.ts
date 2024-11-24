import { makeSearchUserUseCase } from '@/use-cases/factory/make-search-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
    keyword: z.string().default(''),
  })
  const { page, limit, keyword } = registerQuerySchema.parse(request.query)

  const searchUserUseCase = makeSearchUserUseCase()
  const users = await searchUserUseCase.handler(page, limit, keyword)

  return reply.status(200).send(users)
}

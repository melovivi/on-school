import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindPostUseCase } from '@/use-cases/factory/make-find-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function find(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.string().min(1),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const findPostUseCase = makeFindPostUseCase()
  const post = await findPostUseCase.handler(id)

  if (!post) {
    throw new ResourceNotFoundError('Post')
  }

  return reply.status(200).send(post)
}

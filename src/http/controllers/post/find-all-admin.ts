import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { makeFindAllPostUseCase } from '@/use-cases/factory/make-find-all-post-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAllAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const isAdminUseCase = makeIsAdminUseCase()
  const reqUser = request.user as { email: string }
  const IsAdmin = await isAdminUseCase.handler(reqUser.email)

  if (!IsAdmin) {
    throw new InvalidPermissionError()
  }

  const registerQuerySchema = z.object({
    page: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
  })
  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAllPostUseCase = makeFindAllPostUseCase()
  const posts = await findAllPostUseCase.handler(page, limit)

  return reply.status(200).send(posts)
}

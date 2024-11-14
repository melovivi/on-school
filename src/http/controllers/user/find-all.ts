import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { makeFindAllUserUseCase } from '@/use-cases/factory/make-find-all-user-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const isAdminUseCase = makeIsAdminUseCase()
  const reqUser = request.user as { email: string }
  const IsAdmin = await isAdminUseCase.handler(reqUser.email)

  if (!IsAdmin) {
    throw new InvalidPermissionError()
  }

  const registerQuerySchema = z.object({
    page: z.coerce.number().default(0),
    limit: z.coerce.number().default(10),
    isadmin: z.coerce.boolean().default(false),
  })
  const { page, limit, isadmin } = registerQuerySchema.parse(request.query)

  const findAllUserUseCase = makeFindAllUserUseCase()
  const users = await findAllUserUseCase.handler(isadmin, page, limit)

  return reply.status(200).send(users)
}

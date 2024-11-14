import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteUserUseCase } from '@/use-cases/factory/make-delete-user-use-case'
import { makeFindUserUseCase } from '@/use-cases/factory/make-find-user-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const isAdminUseCase = makeIsAdminUseCase()
  const reqUser = request.user as { email: string }
  const IsAdmin = await isAdminUseCase.handler(reqUser.email)

  if (!IsAdmin) {
    throw new InvalidPermissionError()
  }

  const registerParamsSchema = z.object({
    id: z.string().min(1),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const FindUserUseCase = makeFindUserUseCase()
  const user = await FindUserUseCase.handler(id)

  if (!user) {
    throw new ResourceNotFoundError('User')
  }

  const deleteUserUseCase = makeDeleteUserUseCase()
  await deleteUserUseCase.handler(id)
  return reply.status(204).send()
}

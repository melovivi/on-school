import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindUserUseCase } from '@/use-cases/factory/make-find-user-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { makeUpdateUserUseCase } from '@/use-cases/factory/make-update-user-use-case'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const isAdminUseCase = makeIsAdminUseCase()
  const reqUser = req.user as { email: string }
  const IsAdmin = await isAdminUseCase.handler(reqUser.email)

  if (!IsAdmin) {
    throw new InvalidPermissionError()
  }

  const registerParamsSchema = z.object({
    id: z.string().min(1),
  })

  const { id } = registerParamsSchema.parse(req.params)

  const FindUserUseCase = makeFindUserUseCase()
  const user = await FindUserUseCase.handler(id)

  if (!user) {
    throw new ResourceNotFoundError('User')
  }

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    isadmin: z.coerce.boolean(),
  })

  const { name, email, password, isadmin } = registerBodySchema.parse(req.body)

  const hashedPassword = await hash(password, 8)

  user.name = name
  user.email = email
  user.password = hashedPassword
  user.isadmin = isadmin

  const updatedUserCase = makeUpdateUserUseCase()
  const userNew = await updatedUserCase.handler(user)
  return reply.status(200).send(userNew)
}

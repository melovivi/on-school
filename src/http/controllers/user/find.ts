import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function find(req: FastifyRequest, reply: FastifyReply) {
  const reqUser = req.user as { email: string }

  const signinUseCase = makeSigninUseCase()

  const user = await signinUseCase.handler(reqUser.email)

  if (!user) {
    throw new ResourceNotFoundError('Post')
  }

  return reply.status(200).send(user)
}

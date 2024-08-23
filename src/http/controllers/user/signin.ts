import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case'
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  const signinUseCase = makeSigninUseCase()

  const user = await signinUseCase.handler(email)

  if (!user) {
    throw new InvalidCredentialError()
  }

  const doestPasswordMatch = await compare(password, user.password)

  if (!doestPasswordMatch) {
    throw new InvalidCredentialError()
  }

  const token = await reply.jwtSign({ email })

  return reply.status(200).send({ token })
}

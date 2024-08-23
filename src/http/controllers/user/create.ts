import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    isadmin: z.coerce.boolean(),
  })

  const { name, email, password, isadmin } = registerBodySchema.parse(req.body)

  const hashedPassword = await hash(password, 8)

  const createdUser = makeCreateUserUseCase()

  const user = await createdUser.handler(name, email, hashedPassword, isadmin)
  return reply.status(201).send(user)
}

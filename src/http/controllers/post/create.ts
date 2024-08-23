import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case'
import { makeFindUserUseCase } from '@/use-cases/factory/make-find-user-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const isAdminUseCase = makeIsAdminUseCase()
  const reqUser = req.user as { email: string }
  const IsAdmin = await isAdminUseCase.handler(reqUser.email)

  if (!IsAdmin) {
    throw new InvalidPermissionError()
  }

  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    author: z.string(),
  })

  const { title, content, author } = registerBodySchema.parse(req.body)

  const findUserCase = makeFindUserUseCase()
  const user = await findUserCase.handler(author)

  if (!user) {
    throw new ResourceNotFoundError('User')
  }

  const createdPostCase = makeCreatePostUseCase()
  const post = await createdPostCase.handler({ title, content, author: user })
  return reply.status(201).send(post)
}

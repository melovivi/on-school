import { InvalidPermissionError } from '@/use-cases/errors/invalid-permission-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeletePostUseCase } from '@/use-cases/factory/make-delete-post-use-case'
import { makeFindPostUseCase } from '@/use-cases/factory/make-find-post-use-case'
import { makeIsAdminUseCase } from '@/use-cases/factory/make-is-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePost(req: FastifyRequest, reply: FastifyReply) {
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

  const findPostUseCase = makeFindPostUseCase()
  const post = await findPostUseCase.handler(id)

  if (!post) {
    throw new ResourceNotFoundError('Post')
  }

  const deletePostCase = makeDeletePostUseCase()
  await deletePostCase.handler(id)
  return reply.status(204).send()
}

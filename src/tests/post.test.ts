import { app } from '@/app'
import supertest from 'supertest'
import { generateToken } from './tests-utils/generation.token'
import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'

jest.mock('@/repositories/typeorm/post.respository')
jest.mock('@/repositories/typeorm/user.repository')

describe('Create post', () => {
  let adminToken: string
  let userToken: string

  const createAndEditData = {
    title: 'titulo',
    content: 'conteudo',
    author: '1',
  }

  beforeAll(async () => {
    await app.ready()
    const createdUser = makeCreateUserUseCase()

    const adminUser = await createdUser.handler(
      'name',
      'professor@teste.com',
      '123456',
      true,
    )
    const normalUser = await createdUser.handler(
      'name',
      'aluno@teste.com',
      '123456',
      false,
    )

    if (!adminUser || !normalUser) {
      throw new Error('Error to create user')
    } else {
      adminToken = generateToken(adminUser)
      userToken = generateToken(normalUser)
    }
  })

  test('should create post as admin', async () => {
    await app.ready()

    const responseCreatePost = await supertest(app.server)
      .post('/post')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(createAndEditData)
    expect(responseCreatePost.statusCode).toBe(201)
  })

  test('should not create post as normal user', async () => {
    await app.ready()

    const responseCreatePost = await supertest(app.server)
      .post('/post')
      .set('Authorization', `Bearer ${userToken}`)
      .send(createAndEditData)
    expect(responseCreatePost.statusCode).toBe(403)
  })

  test('should edit post as admin', async () => {
    await app.ready()

    const responseEditPost = await supertest(app.server)
      .put('/post/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(createAndEditData)
    expect(responseEditPost.statusCode).toBe(200)
  })

  test('should not edit post as normal user', async () => {
    await app.ready()

    const responseEditPost = await supertest(app.server)
      .put('/post/1')
      .set('Authorization', `Bearer ${userToken}`)
      .send(createAndEditData)
    expect(responseEditPost.statusCode).toBe(403)
  })

  test('should find post by id', async () => {
    await app.ready()

    const responseFindPost = await supertest(app.server)
      .get('/post/1')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
    expect(responseFindPost.statusCode).toBe(200)
  })

  test('should not find post by id', async () => {
    await app.ready()

    const responseFindPost = await supertest(app.server)
      .get('/post/2')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
    expect(responseFindPost.statusCode).toBe(404)
  })

  test('should list all posts', async () => {
    await app.ready()

    const responseListPosts = await supertest(app.server)
      .get('/post')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
    expect(responseListPosts.statusCode).toBe(200)
  })

  test('should list all posts as admin', async () => {
    await app.ready()

    const responseListPosts = await supertest(app.server)
      .get('/post/admin')
      .set('Authorization', `Bearer ${adminToken}`)
      .send()
    expect(responseListPosts.statusCode).toBe(200)
  })

  test('should not list all posts as normal user', async () => {
    await app.ready()

    const responseListPosts = await supertest(app.server)
      .get('/post/admin')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
    expect(responseListPosts.statusCode).toBe(403)
  })

  test('should search post by title', async () => {
    await app.ready()

    const responseSearchPost = await supertest(app.server)
      .get('/post/search')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ title: 'titulo' })
    expect(responseSearchPost.statusCode).toBe(200)
  })

  test('should delete post as admin', async () => {
    await app.ready()

    const responseDeletePost = await supertest(app.server)
      .delete('/post/1')
      .set('Authorization', `Bearer ${adminToken}`)
      .send()
    expect(responseDeletePost.statusCode).toBe(204)
  })

  test('should not delete post as normal user', async () => {
    await app.ready()

    const responseDeletePost = await supertest(app.server)
      .delete('/post/1')
      .set('Authorization', `Bearer ${userToken}`)
      .send()
    expect(responseDeletePost.statusCode).toBe(403)
  })
})

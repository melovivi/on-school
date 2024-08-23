import { app } from '@/app'
import supertest from 'supertest'

jest.mock('@/repositories/typeorm/user.repository')

describe('Create user', () => {
  const signInDataWrongEmail = {
    email: 'teste@teste.com',
    password: '123',
  }
  const signInDataWrongPassword = {
    email: 'teste@email.com',
    password: '567',
  }
  const signInDataCorrect = {
    email: 'teste@email.com',
    password: '123',
  }

  test('should create user', async () => {
    await app.ready()

    const createUserData = {
      name: 'professor',
      email: 'tese@teste.com',
      password: '123456',
      isadmin: true,
    }
    const responseCreateUser = await supertest(app.server)
      .post('/user')
      .send(createUserData)
    expect(responseCreateUser.statusCode).toBe(201)
  })

  test('should not create user', async () => {
    await app.ready()

    const createUserData = {
      name: 'professor',
      email: 'g',
      password: '123456',
      isadmin: true,
    }
    const responseCreateUser = await supertest(app.server)
      .post('/user')
      .send(createUserData)
    expect(responseCreateUser.statusCode).toBe(400)
  })

  test('should login with wrong email', async () => {
    await app.ready()

    const responseSignInWrongEmail = await supertest(app.server)
      .post('/user/signin')
      .send(signInDataWrongEmail)
    expect(responseSignInWrongEmail.statusCode).toBe(404)
  })

  test('should login with wrong password', async () => {
    await app.ready()

    const responseSignInWrongPassword = await supertest(app.server)
      .post('/user/signin')
      .send(signInDataWrongPassword)
    expect(responseSignInWrongPassword.statusCode).toBe(404)
  })

  test('should login with correct email and password', async () => {
    await app.ready()

    const responseSignInCorrect = await supertest(app.server)
      .post('/user/signin')
      .send(signInDataCorrect)
    expect(responseSignInCorrect.statusCode).toBe(200)
  })
})

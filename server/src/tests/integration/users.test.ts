import supertest from 'supertest'
import { connection } from '@database/connection'
import { app } from '../../app'

const knexConfig = require('../../../knexfile')

describe('Users routing', () => {
  beforeAll(async () => {
    await connection.migrate.latest(knexConfig.test)
  })

  afterAll(async () => {
    await connection.migrate.rollback(knexConfig.test)

    await connection.destroy()
  })

  it('should be able to create a new user', async () => {
    async function insertNewUser () {
      const signUpResponse = await supertest(app)
        .post('/users/signup')
        .send({
          name: 'Test',
          password: 'test',
          bio: 'Just a test!',
          email: 'test@gmail.com',
          whatsapp: '5511233334444',
          avatar: 'test.png'
        })

      return signUpResponse
    }

    const signUpResponse = await insertNewUser()

    expect(signUpResponse.body).toHaveProperty('id')
    expect(signUpResponse.body.id).toBeDefined()
    expect(typeof signUpResponse.body.id).toBe('string')
  })

  it('should be able to list all active users', async () => {
    async function listActiveUsers () {
      const usersList = await supertest(app).get('/users')

      return usersList
    }

    const usersList = await listActiveUsers()

    expect(usersList.body).toBeTruthy()
    expect.arrayContaining([{
      id: expect.toString(),
      name: expect.toString(),
      bio: expect.toString(),
      email: expect.toString(),
      whatsapp: expect.toString(),
      avatar: expect.toString()
    }])
  })
})

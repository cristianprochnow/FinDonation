import supertest from 'supertest'
import { app } from '../../app'
import { connection } from '@database/connection'
import { generateToken } from '@utils/generateToken'

const knexConfig = require('../../../knexfile')

const { SECRET } = process.env

const userRegisterData = {
  name: 'Test',
  password: 'test',
  bio: 'Just a test!',
  email: 'test@gmail.com',
  whatsapp: '5511233334444',
  avatar: 'test.png'
}

const userUpdateData = {
  name: 'Test+',
  password: 'test+',
  bio: 'Just a test+!',
  email: 'test+@gmail.com',
  whatsapp: '5511233334444',
  avatar: 'test+.png'
}

interface IUserData {
  name: string,
  password: string,
  bio: string,
  email: string,
  whatsapp: string,
  avatar: string
}

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
          name: userRegisterData.name,
          password: userRegisterData.password,
          bio: userRegisterData.bio,
          email: userRegisterData.email,
          whatsapp: userRegisterData.whatsapp,
          avatar: userRegisterData.avatar
        })

      return signUpResponse
    }

    const signUpResponse = await insertNewUser()

    expect(signUpResponse.body).toHaveProperty('id')
    expect(signUpResponse.body.id).toBeDefined()
    expect(typeof signUpResponse.body.id).toBe('string')
  })

  it('should be able to Log In', async () => {
    async function requestLogIn (email: string, password: string) {
      const logInResponse = await supertest(app)
        .post('/users/login')
        .send({
          email,
          password
        })

      return logInResponse
    }

    const logInResponse = await requestLogIn(
      userRegisterData.email,
      userRegisterData.password
    )

    expect(logInResponse).toBeTruthy()
    expect.objectContaining({
      id: expect.any(String),
      token: expect.any(String)
    })
  })

  it('should be able to list all active users', async () => {
    async function listActiveUsers () {
      const usersList = await supertest(app).get('/users')

      return usersList
    }

    const usersList = await listActiveUsers()

    expect(usersList.body).toBeTruthy()
    expect.arrayContaining([{
      id: expect.any(String),
      name: expect.any(String),
      bio: expect.any(String),
      email: expect.any(String),
      whatsapp: expect.any(String),
      avatar: expect.any(String)
    }])
  })

  it('should return the profile data from specific user', async () => {
    async function requestSignUp () {
      const userResponse = await supertest(app)
        .post('/users/signup')
        .send({
          name: userRegisterData.name,
          password: userRegisterData.password,
          bio: userRegisterData.bio,
          email: userRegisterData.email,
          whatsapp: userRegisterData.whatsapp,
          avatar: userRegisterData.avatar
        })

      return userResponse
    }

    async function takeIdFromSignUpResponse () {
      const usersResponse = await requestSignUp()

      const { id } = usersResponse.body

      return String(id)
    }

    async function requestProfileData (userId: string, token: string) {
      const userProfileData = await supertest(app)
        .get(`/users/profile/${userId}`)
        .set('token', token)

      return userProfileData
    }

    const userId = await takeIdFromSignUpResponse()
    const token = generateToken(userId, SECRET)

    const userProfileResponse = await requestProfileData(userId, token)

    expect(userProfileResponse.body).not.toBe(null)
    expect(userProfileResponse.body).toBeDefined()
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      bio: expect.any(String),
      email: expect.any(String),
      whatsapp: expect.any(String),
      avatar: expect.any(String)
    })
  })

  it('it should update the user profile data from database', async () => {
    interface IUserLogInResponse {
      id: string
      token: string
    }

    interface IUserUpdateResponse {
      id: string
    }

    async function createNewUser (userData: IUserData) {
      try {
        const userSignUpResponse = await supertest(app)
          .post('/users/signup')
          .send(userData)

        return userSignUpResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    async function logInUser (email: string, password: string) {
      try {
        const userLogInResponse = await supertest(app)
          .post('/users/login')
          .send({ email, password })

        return userLogInResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    async function updateUserData (
      token: string,
      userId: string,
      userUpdateData: IUserData
    ) {
      try {
        const userUpdateResponse = await supertest(app)
          .post(`/users/update/${userId}`)
          .set('token', token)
          .send(userUpdateData)

        return userUpdateResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    await createNewUser(userRegisterData)
    const userLogInResponse: IUserLogInResponse = await logInUser(
      userRegisterData.email,
      userRegisterData.password
    )
    const userUpdateResponse: IUserUpdateResponse = await updateUserData(
      userLogInResponse.token,
      userLogInResponse.id,
      userUpdateData
    )

    expect(userUpdateResponse).toBeDefined()
    expect(userUpdateResponse).toBeTruthy()
    expect(typeof userUpdateResponse.id).toBe('string')
  })
})

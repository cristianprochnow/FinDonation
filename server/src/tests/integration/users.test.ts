import supertest from 'supertest'
import { app } from '../../app'
import { connection } from '@database/connection'

const knexConfig = require('../../../knexfile')

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
    interface IUserSignUpResponse {
      id: string
    }

    async function insertNewUser (
      userData: IUserData
    ): Promise<IUserSignUpResponse> {
      try {
        const signUpResponse = await supertest(app)
          .post('/users/signup')
          .send(userData)

        return signUpResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    const signUpResponse = await insertNewUser(userRegisterData)

    expect(signUpResponse).toBeDefined()
    expect(signUpResponse).not.toBe({})
    expect(signUpResponse).toHaveProperty('id')
    expect(typeof signUpResponse.id).toBe('string')
  })

  it('should be able to Log In', async () => {
    interface IUserLogInResponse {
      id: string
      token: string
    }

    async function requestLogIn (
      email: string,
      password: string
    ): Promise<IUserLogInResponse> {
      try {
        const logInResponse = await supertest(app)
          .post('/users/login')
          .send({
            email,
            password
          })

        return logInResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    const logInResponse = await requestLogIn(
      userRegisterData.email,
      userRegisterData.password
    )

    expect(logInResponse).toBeDefined()
    expect(logInResponse).toBeTruthy()
    expect(logInResponse).not.toBe({})
    expect(typeof logInResponse.id).toBe('string')
    expect(typeof logInResponse.token).toBe('string')
  })

  it('should be able to list all active users', async () => {
    async function listActiveUsers () {
      try {
        const usersList = await supertest(app).get('/users')

        return usersList
      } catch (error) {
        throw new Error()
      }
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
    interface IUserSignUpResponse {
      id: string
    }

    interface IUserLogInResponse {
      id: string
      token: string
    }

    interface IUserProfileDataResponse {
      id: string
      name: string
      bio: string
      email: string
      whatsapp: string
      avatar: string
    }

    async function requestSignUp (
      userData: IUserData
    ): Promise<IUserSignUpResponse> {
      const userResponse = await supertest(app)
        .post('/users/signup')
        .send(userData)

      return userResponse.body
    }

    async function logInUser (
      email: string,
      password: string
    ): Promise<IUserLogInResponse> {
      try {
        const userLogInResponse = await supertest(app)
          .post('/users/login')
          .send({ email, password })

        return userLogInResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    async function requestProfileData (
      userId: string,
      token: string
    ): Promise<IUserProfileDataResponse> {
      const userProfileData = await supertest(app)
        .get(`/users/profile/${userId}`)
        .set('token', token)

      return userProfileData.body
    }

    await requestSignUp(userRegisterData)
    const { id, token } = await logInUser(
      userRegisterData.email,
      userRegisterData.password
    )

    const userProfileResponse = await requestProfileData(id, token)

    expect(userProfileResponse).toBeTruthy()
    expect(userProfileResponse).toBeDefined()
    expect(userProfileResponse).not.toBe({})
    expect(typeof userProfileResponse.id).toBe('string')
    expect(typeof userProfileResponse.name).toBe('string')
    expect(typeof userProfileResponse.bio).toBe('string')
    expect(typeof userProfileResponse.email).toBe('string')
    expect(typeof userProfileResponse.whatsapp).toBe('string')
    expect(typeof userProfileResponse.avatar).toBe('string')
  })

  it('it should update the user data from database', async () => {
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

    async function logInUser (
      email: string,
      password: string
    ): Promise<IUserLogInResponse> {
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
    ): Promise<IUserUpdateResponse> {
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
    const userLogInResponse = await logInUser(
      userRegisterData.email,
      userRegisterData.password
    )
    const userUpdateResponse = await updateUserData(
      userLogInResponse.token,
      userLogInResponse.id,
      userUpdateData
    )

    expect(userUpdateResponse).toBeDefined()
    expect(userUpdateResponse).toBeTruthy()
    expect(typeof userUpdateResponse.id).toBe('string')
  })

  it('should be able to deactivate a user account', async () => {
    interface IUserSignUpResponse {
      id: string
    }

    interface IUserLogInResponse {
      id: string
      token: string
    }

    interface IUserDeactivationResponse {
      id: string
    }

    async function userSignUp (
      userData: IUserData
    ): Promise<IUserSignUpResponse> {
      try {
        const userSignUpResponse = await supertest(app)
          .post('/users/signup')
          .send(userData)

        return userSignUpResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    async function userLogIn (
      email: string,
      password: string
    ): Promise<IUserLogInResponse> {
      try {
        const userLogInResponse = await supertest(app)
          .post('/users/login')
          .send({ email, password })

        return userLogInResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    async function userDeactivation (
      userId: string,
      token: string
    ): Promise<IUserDeactivationResponse> {
      try {
        const userDeactivationResponse = await supertest(app)
          .post(`/users/deactivate/${userId}`)
          .set('token', token)

        return userDeactivationResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    try {
      await userSignUp(userRegisterData)
      const { id, token } = await userLogIn(
        userRegisterData.email,
        userRegisterData.password
      )
      const userDeactivationResponse = await userDeactivation(id, token)

      expect(userDeactivationResponse).toBeDefined()
      expect(userDeactivationResponse).toBeTruthy()
      expect(userDeactivationResponse).not.toBe({})
      expect(typeof userDeactivationResponse.id).toBe('string')
    } catch (error) {
      throw new Error()
    }
  })
})

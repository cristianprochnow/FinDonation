import supertest from 'supertest'

import { app } from '../../app'

export const userRegisterData = {
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

export interface IUserData {
  name: string,
  password: string,
  bio: string,
  email: string,
  whatsapp: string,
  avatar: string
}

export interface IUserSignUpResponse {
  id: string
}

export interface IUserLogInResponse {
  id: string
  token: string
}

export async function userSignUp (
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

export async function userLogIn (
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

describe('Users routing', () => {
  it('should be able to create a new user', async () => {
    const signUpResponse = await userSignUp(userRegisterData)

    expect(signUpResponse).toBeDefined()
    expect(signUpResponse).not.toBe({})
    expect(signUpResponse).toHaveProperty('id')
    expect(typeof signUpResponse.id).toBe('string')
  })

  it('should be able to Log In', async () => {
    const logInResponse = await userLogIn(
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
    interface IUserProfileDataResponse {
      id: string
      name: string
      bio: string
      email: string
      whatsapp: string
      avatar: string
    }

    async function userProfileData (
      userId: string,
      token: string
    ): Promise<IUserProfileDataResponse> {
      try {
        const userProfileData = await supertest(app)
          .get(`/users/profile/${userId}`)
          .set('token', token)

        return userProfileData.body
      } catch (error) {
        throw new Error()
      }
    }

    await userSignUp(userRegisterData)
    const { id, token } = await userLogIn(
      userRegisterData.email,
      userRegisterData.password
    )

    const userProfileResponse = await userProfileData(id, token)

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
    interface IUserUpdateResponse {
      id: string
    }

    async function updateUserData (
      token: string,
      userId: string,
      userUpdateData: IUserData
    ): Promise<IUserUpdateResponse> {
      try {
        const userUpdateResponse = await supertest(app)
          .put(`/users/update/${userId}`)
          .set('token', token)
          .send(userUpdateData)

        return userUpdateResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    await userSignUp(userRegisterData)
    const userLogInResponse = await userLogIn(
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
    expect(userUpdateResponse.id).toBeDefined()
    expect(userUpdateResponse.id).toBeTruthy()
    expect(typeof userUpdateResponse.id).toBe('string')
  })

  it('should be able to deactivate a user account', async () => {
    interface IUserDeactivationResponse {
      id: string
    }

    async function userDeactivation (
      userId: string,
      token: string
    ): Promise<IUserDeactivationResponse> {
      try {
        const userDeactivationResponse = await supertest(app)
          .patch(`/users/deactivate/${userId}`)
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
      expect(userDeactivationResponse.id).toBeDefined()
      expect(userDeactivationResponse.id).toBeTruthy()
      expect(typeof userDeactivationResponse.id).toBe('string')
    } catch (error) {
      throw new Error()
    }
  })
})

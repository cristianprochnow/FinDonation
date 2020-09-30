import supertest from 'supertest'

import { app } from '../../app'
import { userRegisterData, IUserData } from './users.test'

const donationRegisterData = {
  title: 'Donation from show',
  description: 'Just a delicious donation!',
  image: 'donation.png',
  uf: 'SC',
  city: 'Joinville',
  neighbourhood: 'Itinga',
  street: 'Uma rua',
  number: 'Nº 0123',
  latitude: -26.4479106,
  longitude: -48.6288651
}

interface IUserSignUpResponse {
  id: string
}

interface IUserLogInResponse {
  id: string
  token: string
}

interface IDonationRegisterData {
  title: string
  description: string
  image: string
  uf: string
  city: string
  neighbourhood: string
  street: string
  number: string
  latitude: number
  longitude: number
}

interface IBasicDonationResponse {
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

describe('Donations Routing', () => {
  it('should create a new donation', async () => {
    async function createDonation (
      donationData: IDonationRegisterData,
      token: string
    ): Promise<IBasicDonationResponse> {
      try {
        const donationCreationResponse = await supertest(app)
          .post('/donations/create')
          .set('token', token)
          .send(donationData)

        return donationCreationResponse.body
      } catch (error) {
        throw new Error()
      }
    }

    try {
      await userSignUp(userRegisterData)
      const userLogInResponse = await userLogIn(
        userRegisterData.email,
        userRegisterData.password
      )

      const donationCreationResponse = await createDonation(
        donationRegisterData,
        userLogInResponse.token
      )

      expect(donationCreationResponse).toBeDefined()
      expect(donationCreationResponse).toBeTruthy()
      expect(donationCreationResponse.id).toBeDefined()
      expect(donationCreationResponse.id).toBeTruthy()
      expect(typeof donationCreationResponse.id).toBe('string')
    } catch (error) {
      throw new Error()
    }
  })
})

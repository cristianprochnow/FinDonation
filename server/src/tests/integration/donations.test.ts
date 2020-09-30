import supertest from 'supertest'

import { app } from '../../app'
import {
  userRegisterData,
  userSignUp,
  userLogIn,
  IUserData,
  IUserSignUpResponse,
  IUserLogInResponse
} from './users.test'

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

interface ICompleteDonationsData {
  id: string
  title: string
  description: string
  image: string
  uf: string
  city: string
  neighbourhood: string
  street: string
  number: string
  latitude: string
  longitude: string
  user_id: string
}
interface IDonationData {
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

async function createDonation (
  donationData: IDonationData,
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

describe('Donations Routing', () => {
  it('should create a new donation', async () => {
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

  it('should list all the donations', async () => {
    async function fetchAllDonations (): Promise<ICompleteDonationsData[]> {
      try {
        const donationsList = await supertest(app)
          .get('/donations')

        return donationsList.body
      } catch (error) {
        throw new Error()
      }
    }

    try {
      const donationsList = await fetchAllDonations()

      expect(donationsList).toBeDefined()
      expect(donationsList).toBeTruthy()
      expect.arrayContaining([{
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        image: expect.any(String),
        uf: expect.any(String),
        city: expect.any(String),
        neighbourhood: expect.any(String),
        street: expect.any(String),
        number: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        user_id: expect.any(String)
      }])
    } catch (error) {
      throw new Error()
    }
  })

  it('should show the details from a donation', async () => {
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

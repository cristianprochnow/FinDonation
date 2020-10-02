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
  latitude: -15.4479106,
  longitude: -89.6288651,
  categories: '1,2,3'
}

const donationUpdateData = {
  title: 'Donation Updated',
  description: 'Just a delicious update!',
  image: 'update.png',
  uf: 'PR',
  city: 'Maringá',
  neighbourhood: 'Algum',
  street: 'Outra rua',
  number: 'Nº 3210',
  latitude: -12.4479106,
  longitude: -97.6288651,
  categories: '4,5,6'
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
  categories: string
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

async function fetchAllDonations (): Promise<ICompleteDonationsData[]> {
  try {
    const donationsList = await supertest(app)
      .get('/donations')

    return donationsList.body
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

      const donationListBeforeRegister = await fetchAllDonations()

      const donationCreationResponse = await createDonation(
        donationRegisterData,
        userLogInResponse.token
      )

      const donationListAfterRegister = await fetchAllDonations()

      expect(donationCreationResponse).toBeDefined()
      expect(donationCreationResponse).toBeTruthy()
      expect(donationCreationResponse.id).toBeDefined()
      expect(donationCreationResponse.id).toBeTruthy()
      expect(typeof donationCreationResponse.id).toBe('string')
      expect(donationListAfterRegister.length)
        .toBeGreaterThan(donationListBeforeRegister.length)
    } catch (error) {
      throw new Error()
    }
  })

  it('should list all the donations', async () => {
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

  it('should update data from a specific donation', async () => {
    async function updateDonation (
      donationData: IDonationData,
      donationId: string,
      token: string
    ): Promise<IBasicDonationResponse> {
      try {
        const donationUpdateResponse = await supertest(app)
          .put(`/donations/update/${donationId}`)
          .set('token', token)
          .send(donationData)

        return donationUpdateResponse.body
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
      const donationUpdateResponse = await updateDonation(
        donationUpdateData,
        donationCreationResponse.id,
        userLogInResponse.token
      )

      expect(donationUpdateResponse).toBeDefined()
      expect(donationUpdateResponse).toBeTruthy()
      expect(donationUpdateResponse.id).toBeDefined()
      expect(donationUpdateResponse.id).toBeTruthy()
      expect(typeof donationUpdateResponse.id).toBe('string')
    } catch (error) {
      throw new Error()
    }
  })

  it('should delete a donation', async () => {
    async function deleteDonation (
      donationId: string,
      token: string
    ): Promise<IBasicDonationResponse> {
      try {
        const donationDeleteResponse = await supertest(app)
          .delete(`/donations/delete/${donationId}`)
          .set('token', token)

        return donationDeleteResponse.body
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
      const donationsListBeforeDelete = await fetchAllDonations()
      const donationDeleteResponse = await deleteDonation(
        donationCreationResponse.id,
        userLogInResponse.token
      )
      const donationsListAfterDelete = await fetchAllDonations()

      expect(donationDeleteResponse).toBeDefined()
      expect(donationDeleteResponse).toBeTruthy()
      expect(donationDeleteResponse.id).toBeDefined()
      expect(donationDeleteResponse.id).toBeTruthy()
      expect(typeof donationDeleteResponse.id).toBe('string')
      expect(donationsListAfterDelete.length)
        .toBeLessThan(donationsListBeforeDelete.length)
    } catch (error) {
      throw new Error()
    }
  })
})

import { connection } from '@database/connection'

export interface ICompleteDonationsData {
  id: string
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

export default class Donations {
  async listAllTheDonations (): Promise<ICompleteDonationsData[]> {
    try {
      const donationsList = await connection('donations')
        .select('*')

      return donationsList
    } catch (error) {
      throw new Error()
    }
  }

  async createNewDonation (
    userId: string,
    donationId: string,
    donationData: IDonationData
  ): Promise<void> {
    try {
      await connection('donations')
        .insert({
          id: donationId,
          ...donationData,
          user_id: userId
        })
    } catch (error) {
      throw new Error()
    }
  }

  async fetchDonationDataById (
    donationId: string
  ): Promise<ICompleteDonationsData> {
    try {
      const donationData = await connection('donations')
        .first('*')
        .where({ id: donationId })

      return donationData
    } catch (error) {
      throw new Error()
    }
  }

  async updateDonationById (
    donationData: IDonationData,
    donationId: string
  ): Promise<void> {
    try {
      await connection('donations')
        .update({ ...donationData })
        .where({ id: donationId })
    } catch (error) {
      throw new Error()
    }
  }
}

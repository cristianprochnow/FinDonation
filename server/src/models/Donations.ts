import { connection } from '@database/connection'
import { IDefaultDonationsData } from '@types/donations'

export default class Donations {
  async listAllTheDonations (): Promise<IDefaultDonationsData[]> {
    try {
      const donationsList = await connection('donations')
        .select('*')

      return donationsList
    } catch (error) {
      throw new Error()
    }
  }
}

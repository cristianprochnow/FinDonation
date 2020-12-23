import { connection } from '@database/connection'
import { Transaction } from 'knex'

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

export interface IDonationCategories {
  item_id: number
  donation_id: string
}

interface IDonationsWithUser {
  id: string
  title: string
  description: string
  image: string
  email: string
  whatsapp: string
}

interface IDonationsByUserId {
  id: string
  title: string
  description: string
  image: string
}

export default class Donations {
  async startConnectionTransaction () {
    return await connection.transaction()
  }

  async commitConnectionTransaction (
    connectionTransaction: Transaction
  ) {
    return await connectionTransaction.commit()
  }

  async listAllTheDonations (): Promise<ICompleteDonationsData[]> {
    try {
      const donationsList = await connection('donations')
        .select('*')

      return donationsList
    } catch (error) {
      throw new Error()
    }
  }

  async listDonationsWithUserRelation (): Promise<IDonationsWithUser[]> {
    try {
      const donationsListWithUsersRelation = await connection('donations')
        .select(
          'donations.id',
          'donations.title',
          'donations.description',
          'donations.image',
          'users.email',
          'users.whatsapp'
        ).innerJoin('users', 'donations.user_id', '=', 'users.id')

      return donationsListWithUsersRelation
    } catch (error) {
      throw new Error()
    }
  }

  async listCategoriesWithDonationRelation (
    donationId: string
  ): Promise<number[]> {
    interface CategoryAsObject {
      item_id: number
    }

    try {
      const categoriesAsObject: CategoryAsObject[] = await connection('item_has_donations')
        .select('item_id')
        .where({ donation_id: donationId })

      const categoriesAsArray = categoriesAsObject
        .map(category => category.item_id)

      return categoriesAsArray
    } catch (error) {
      throw new Error(error)
    }
  }

  async associateDonationWithCategories (
    connectionTransaction: Transaction,
    donationCategories: IDonationCategories[]
  ): Promise<void> {
    try {
      await connectionTransaction('item_has_donations')
        .insert(donationCategories)
    } catch (error) {
      throw new Error()
    }
  }

  async createNewDonation (
    userId: string,
    donationId: string,
    donationData: IDonationData,
    donationCategories: IDonationCategories[]
  ): Promise<void> {
    try {
      const connectionTransaction = await this.startConnectionTransaction()

      await connectionTransaction('donations')
        .insert({
          id: donationId,
          ...donationData,
          user_id: userId
        })

      await this.associateDonationWithCategories(
        connectionTransaction,
        donationCategories
      )

      await this.commitConnectionTransaction(connectionTransaction)
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

  async deleteDonationCategoriesAssociation (
    connectionTransaction: Transaction,
    donationId: string
  ): Promise<void> {
    try {
      await connectionTransaction('item_has_donations')
        .where({ donation_id: donationId })
        .del()
    } catch (error) {
      throw new Error()
    }
  }

  async updateDonationById (
    donationData: IDonationData,
    donationId: string,
    donationCategories: IDonationCategories[]
  ): Promise<void> {
    try {
      const connectionTransaction = await this.startConnectionTransaction()

      await connectionTransaction('donations')
        .update({ ...donationData })
        .where({ id: donationId })

      await this.deleteDonationCategoriesAssociation(
        connectionTransaction,
        donationId
      )

      await this.associateDonationWithCategories(
        connectionTransaction,
        donationCategories
      )

      await this.commitConnectionTransaction(connectionTransaction)
    } catch (error) {
      throw new Error()
    }
  }

  async deleteDonationById (donationId: string): Promise<void> {
    try {
      await connection('donations')
        .where({ id: donationId })
        .del()
    } catch (error) {
      throw new Error()
    }
  }

  async listDonationsByUserID (
    userId: string
  ): Promise<IDonationsByUserId[]> {
    try {
      const donations = await connection('donations')
        .where({ user_id: userId })
        .select(
          'id',
          'title',
          'description',
          'image'
        )

      return donations
    } catch (error) {
      throw new Error()
    }
  }

  async filterDonationsByLocation (
    state: string,
    city: string
  ) {
    try {
      const filteredDonations = await connection
        .select(
          'id',
          'title',
          'description',
          'image'
        )
        .from('donations')
        .where({
          uf: state,
          city
        })

      return filteredDonations
    } catch (error) {
      throw new Error(error)
    }
  }
}

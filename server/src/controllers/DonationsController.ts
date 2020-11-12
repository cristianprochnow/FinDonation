import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import Donations, {
  ICompleteDonationsData,
  IDonationCategories
} from '@models/Donations'
import { generateUuid } from '@utils/generateUuid'

const donationsModel = new Donations()

interface IBasicDonationResponse {
  id: string
}

export interface ISerializedCompleteDonationsData {
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
  image_url: string
  categories: number[]
}

export interface ISerializedDonationsWithUserData {
  id: string
  title: string
  description: string
  image: string
  email: string
  whatsapp: string
  image_url: string
}

interface IDonationsByUser {
  id: string
  title: string
  description: string
  image: string
  image_url: string
}

function joinCategoryIdWithDonationId (
  categoriesIds: string,
  donationId: string
): IDonationCategories[] {
  const listWithCategoriesJoinedWithDonations = categoriesIds
    .split(',')
    .map(categoryIdAsString => Number(categoryIdAsString))
    .map(categoryIdAsNumber => {
      return {
        item_id: categoryIdAsNumber,
        donation_id: donationId
      }
    })

  return listWithCategoriesJoinedWithDonations
}

const {
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT
} = process.env

export default class DonationsController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<ISerializedDonationsWithUserData[]>> {
    try {
      const donationsList = await donationsModel.listDonationsWithUserRelation()

      const serializedDonationsList = donationsList.map(donation => {
        return {
          ...donation,
          image_url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/uploads/${donation.image}`
        }
      })

      return response.status(200).json(serializedDonationsList)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async create (
    request: Request,
    response: Response
  ): Promise<Response<IBasicDonationResponse>> {
    const {
      title,
      description,
      uf,
      city,
      neighbourhood,
      street,
      number,
      latitude,
      longitude,
      categories
    } = request.body

    const { filename } = request.file

    interface IToken {
      id: string
    }

    function decodeToken (token: string) {
      const decodedToken = jwt.decode(token)

      return decodedToken as IToken
    }

    const donationId = generateUuid()
    const userDecodedToken = decodeToken(request.headers.token as string)
    const listOfCategoriesJoinedWithDonation = joinCategoryIdWithDonationId(
      categories,
      donationId
    )

    try {
      await donationsModel.createNewDonation(
        userDecodedToken.id,
        donationId,
        {
          title,
          description,
          image: filename,
          uf,
          city,
          neighbourhood,
          street,
          number,
          latitude,
          longitude
        },
        listOfCategoriesJoinedWithDonation
      )

      return response.status(201).json({ id: donationId })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async details (
    request: Request,
    response: Response
  ): Promise<Response<ISerializedCompleteDonationsData>> {
    const { id } = request.params

    try {
      const donationDetails = await donationsModel.fetchDonationDataById(id)
      const donationCategories = await donationsModel.listCategoriesWithDonationRelation(id)

      const serializedDonationsDetails = {
        ...donationDetails,
        image_url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/uploads/${donationDetails.image}`,
        categories: donationCategories
      }

      return response.status(200).json(serializedDonationsDetails)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async update (
    request: Request,
    response: Response
  ): Promise<Response<IBasicDonationResponse>> {
    const { id } = request.params
    const {
      title,
      description,
      uf,
      city,
      neighbourhood,
      street,
      number,
      latitude,
      longitude,
      categories
    } = request.body

    const { filename } = request.file

    const donationsWithCategories = joinCategoryIdWithDonationId(
      categories,
      id
    )

    try {
      await donationsModel.updateDonationById(
        {
          title,
          description,
          image: filename,
          uf,
          city,
          neighbourhood,
          street,
          number,
          latitude,
          longitude
        },
        id,
        donationsWithCategories
      )

      return response.status(201).json({ id })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async delete (
    request: Request,
    response: Response
  ): Promise<Response<IBasicDonationResponse>> {
    const { id } = request.params

    try {
      await donationsModel.deleteDonationById(id)

      return response.status(200).json({ id })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async donationsByUser (
    request: Request,
    response: Response
  ): Promise<Response<IDonationsByUser[]>> {
    const { userId } = request.params

    try {
      const donationsByUserId = await donationsModel.listDonationsByUserID(userId)

      const serializedDonationsList = donationsByUserId.map(donation => {
        const imageUrl = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/uploads/${donation.image}`

        return {
          ...donation,
          image_url: imageUrl
        }
      })

      return response.status(200).json(serializedDonationsList)
    } catch (error) {
      return response.status(500).send()
    }
  }
}

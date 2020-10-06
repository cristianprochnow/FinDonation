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

export default class DonationsController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<ISerializedCompleteDonationsData[]>> {
    const {
      SERVER_PROTOCOL,
      SERVER_HOST,
      SERVER_PORT
    } = process.env

    try {
      const donationsList = await donationsModel.listAllTheDonations()

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
  ): Promise<Response<ICompleteDonationsData>> {
    const { id } = request.params

    try {
      const donationDetails = await donationsModel.fetchDonationDataById(id)

      return response.status(200).json(donationDetails)
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
      image,
      uf,
      city,
      neighbourhood,
      street,
      number,
      latitude,
      longitude,
      categories
    } = request.body

    const donationsWithCategories = joinCategoryIdWithDonationId(
      categories,
      id
    )

    try {
      await donationsModel.updateDonationById(
        {
          title,
          description,
          image,
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
}

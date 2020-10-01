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

export default class DonationsController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<ICompleteDonationsData[]>> {
    try {
      const donationsList = await donationsModel.listAllTheDonations()

      return response.status(200).json(donationsList)
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
          image,
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

    try {
      await donationsModel.updateDonationById(
        request.body,
        id
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

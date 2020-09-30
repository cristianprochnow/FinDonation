import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import Donations, { ICompleteDonationsData } from '@models/Donations'
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
    interface IToken {
      id: string
    }

    function decodeToken (token: string) {
      const decodedToken = jwt.decode(token)

      return decodedToken as IToken
    }

    const donationId = generateUuid()
    const userDecodedToken = decodeToken(request.headers.token as string)

    try {
      await donationsModel.createNewDonation(
        userDecodedToken.id,
        donationId,
        request.body
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
}

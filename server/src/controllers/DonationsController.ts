import { Request, Response } from 'express'
import jwt, { decode } from 'jsonwebtoken'

import Donations from '@models/Donations'
import { generateUuid } from '@utils/generateUuid'

const donationsModel = new Donations()

interface IDefaultDonationsData {
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

export default class DonationsController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<IDefaultDonationsData[]>> {
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
  ) {
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
}

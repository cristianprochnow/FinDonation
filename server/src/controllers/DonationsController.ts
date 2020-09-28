import { Request, Response } from 'express'

import Donations from '@models/Donations'
import { IDefaultDonationsData } from '@types/donations'

const donationsModel = new Donations()

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
}

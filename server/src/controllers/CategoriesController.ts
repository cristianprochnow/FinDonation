import { Request, Response } from 'express'

export class CategoriesController {
  async index (request: Request, response: Response) {
    return response.json({ message: 'Yeah!' })
  }
}

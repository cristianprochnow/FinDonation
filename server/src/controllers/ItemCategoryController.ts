import { Request, Response } from 'express'

import ItemCategory from '@models/ItemCategory'

interface IIndexResponse {
  id: number
  title: string
  icon: string
  icon_url: string
}

export default class ItemCategoryController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<IIndexResponse[]>> {
    const itemCategoryModel = new ItemCategory()

    const {
      SERVER_PORT,
      SERVER_HOST,
      SERVER_PROTOCOL
    } = process.env

    try {
      const itemsCategoriesList = await itemCategoryModel.listAllTheItems()

      const serializedItemsList = itemsCategoriesList.map(item => {
        return {
          ...item,
          icon_url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/icons/${item.icon}`
        }
      })

      return response.status(200).json(serializedItemsList)
    } catch (error) {
      return response.status(400).send()
    }
  }
}

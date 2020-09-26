import { connection } from '@database/connection'

interface IListAllTheItemsResponse {
  id: number
  title: string
  icon: string
}

export default class ItemCategory {
  async listAllTheItems (): Promise<IListAllTheItemsResponse[]> {
    try {
      const itemsCategoriesList = await connection('item_category')
        .select('*')

      return itemsCategoriesList
    } catch (error) {
      throw new Error()
    }
  }
}

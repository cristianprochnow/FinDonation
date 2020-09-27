import supertest from 'supertest'

import { app } from '../../app'

describe('Item Category Routing', () => {
  it('should list all the items', async () => {
    interface IListAllTheItemsResponse {
      id: number
      title: string
      icon: string
      icon_url: string
    }

    async function listAllTheItems (): Promise<IListAllTheItemsResponse[]> {
      try {
        const itemsList = await supertest(app)
          .get('/items')

        return itemsList.body
      } catch (error) {
        throw new Error()
      }
    }

    try {
      const itemsList = await listAllTheItems()

      expect(itemsList).toBeDefined()
      expect(itemsList).toBeTruthy()
      expect(typeof itemsList).toBe('object')

      itemsList.map(item => {
        expect(item.id).toBeDefined()
        expect(item.id).not.toBe(null)
        expect(typeof item.id).toBe('number')

        expect(item.title).toBeDefined()
        expect(item.title).not.toBe(null)
        expect(typeof item.title).toBe('string')

        expect(item.icon).toBeDefined()
        expect(item.icon).not.toBe(null)
        expect(typeof item.icon).toBe('string')

        expect(item.icon_url).toBeDefined()
        expect(item.icon_url).not.toBe(null)
        expect(typeof item.icon_url).toBe('string')
      })
    } catch (error) {
      throw new Error()
    }
  })
})

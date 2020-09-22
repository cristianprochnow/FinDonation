import { generateUuid } from '@utils/generateUuid'

describe('Generate UUID', () => {
  it('should generate an UUID', () => {
    const uuid = generateUuid()

    expect(uuid).toHaveLength(36)
    expect(uuid).not.toBeNull()
    expect(typeof uuid).toBe('string')
  })
})

import { generateRandomHash } from '@utils/generateRandomHash'

describe('Generate Random Hash', () => {
  it('should return a random hash from crypto lib', () => {
    const randomHash = generateRandomHash(8)

    expect(randomHash).toBeDefined()
    expect(typeof randomHash).toBe('string')
  })
})

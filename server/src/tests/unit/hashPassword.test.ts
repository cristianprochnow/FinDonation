import { generateUuid } from '@utils/generateUuid'
import { hashPassword } from '@utils/hashPassword'

describe('Hash password', () => {
  it('should hash a password', async () => {
    const randomUuidString = generateUuid()
    const hashedPassword = await hashPassword(randomUuidString)

    expect(hashedPassword).not.toBe(null)
    expect(hashedPassword.length).toBeGreaterThan(50)
    expect(typeof hashedPassword).toBe('string')
  })
})

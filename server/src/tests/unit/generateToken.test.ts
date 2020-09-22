import * as dotenv from 'dotenv'

import { generateUuid } from '@utils/generateUuid'
import { generateToken } from '@utils/generateToken'

dotenv.config()

const { SECRET } = process.env
const id = generateUuid()

describe('Generate token', () => {
  it('should return a JWT token', () => {
    const token = generateToken(id, SECRET)

    expect(token).not.toBeNull()
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
  })
})

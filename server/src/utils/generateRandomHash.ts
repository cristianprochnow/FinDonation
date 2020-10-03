import crypto from 'crypto'

export function generateRandomHash (
  hashLength: number
): string {
  const hash = crypto.randomBytes(hashLength).toString('hex')

  return hash
}

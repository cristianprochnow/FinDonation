import jwt from 'jsonwebtoken'

export function verifyTokenIntegrity (token: string, secretKey: string) {
  const isValidToken = jwt.verify(
    token,
    secretKey
  )

  if (isValidToken) {
    return true
  } else {
    return false
  }
}

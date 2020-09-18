import jwt from 'jsonwebtoken'

export function generateToken (
  id: string,
  secretKey: string,
  timeToExpire: string = '1h'
) {
  const token = jwt.sign(
    { id },
    secretKey,
    { expiresIn: timeToExpire }
  )

  return token
}

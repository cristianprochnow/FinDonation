import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default class UsersMiddleware {
  verifyToken (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { token } = request.headers
    const { SECRET } = process.env

    try {
      const isValidToken = jwt.verify(token as string, SECRET)

      if (isValidToken) {
        next()
      } else {
        throw new Error()
      }
    } catch (error) {
      return response.status(401).send()
    }
  }
}

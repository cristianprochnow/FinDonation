import { NextFunction, Request, Response } from 'express'

import { verifyTokenIntegrity } from 'src/utils/verifyTokenIntegrity'

export default class UsersMiddleware {
  async token (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { SECRET } = process.env
    const { token } = request.headers

    try {
      const isValidToken = verifyTokenIntegrity(token as string, SECRET)

      if (isValidToken) {
        next()
      } else {
        throw new Error('Invalid token.')
      }
    } catch (error) {
      return response.status(401).json({ error })
    }
  }
}

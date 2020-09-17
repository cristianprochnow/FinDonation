import { Request, Response } from 'express'

import { generateUuid } from 'src/utils/generateUuid'
import { hashPassword } from 'src/utils/hashPassword'

import { connection } from '../database/connection'

export default class UsersController {
  async signUp (request: Request, response: Response) {
    const {
      name,
      password,
      email,
      whatsapp,
      avatar
    } = request.body

    const userId = generateUuid()
    const hashedPassword = await hashPassword(password)

    try {
      await connection('users').insert({
        id: userId,
        name,
        password: hashedPassword,
        email,
        whatsapp,
        avatar,
        is_active: 1,
        type_user_id: 1
      })

      return response.status(201).json({
        id: userId
      })
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    try {
      const usersList = await connection('users')
        .select('id', 'name', 'email', 'whatsapp', 'avatar')
        .where({ id })

      const userData = usersList[0]

      return response.status(200).json(userData)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}

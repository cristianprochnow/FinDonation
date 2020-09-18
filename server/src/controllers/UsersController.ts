import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'

import { generateUuid } from 'src/utils/generateUuid'
import { hashPassword } from 'src/utils/hashPassword'
import { generateToken } from 'src/utils/generateToken'

import { connection } from '../database/connection'

export default class UsersController {
  async index (request: Request, response: Response) {
    try {
      const usersList = await connection('users')
        .select(
          'id',
          'name',
          'email',
          'whatsapp',
          'avatar'
        )
        .where({
          is_active: 1,
          type_user_id: 1
        })

      return response.status(200).json(usersList)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async signUp (request: Request, response: Response) {
    const {
      name,
      bio,
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
        bio,
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

  async logIn (request: Request, response: Response) {
    const { SECRET } = process.env

    const {
      email,
      password
    } = request.body

    try {
      const passwordFromDatabase = await connection('users')
        .select('password')
        .where({
          email
        })

      const specificPassword = passwordFromDatabase[0].password

      const isCorrectPassword = await bcrypt.compare(
        password,
        specificPassword
      )

      if (isCorrectPassword) {
        const userId = await connection('users')
          .select('id')
          .where({
            email
          })

        const specificUserId = userId[0].id

        const token = generateToken(specificUserId, SECRET, '1h')

        return response.status(201).json({ id: specificUserId, token })
      } else {
        throw new Error('E-mail or password are incorrect.')
      }
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async profile (request: Request, response: Response) {
    const { id } = request.params

    try {
      const usersList = await connection('users')
        .select('id', 'name', 'bio', 'email', 'whatsapp', 'avatar')
        .where({ id })

      const userData = usersList[0]

      return response.status(200).json(userData)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async deactivate (request: Request, response: Response) {
    const { id } = request.params

    try {
      await connection('users').update({
        is_active: 0
      }).where({ id })

      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async update (request: Request, response: Response) {
    const { id } = request.params

    const {
      name,
      bio,
      password,
      email,
      whatsapp,
      avatar
    } = request.body

    const hashedPassword = await hashPassword(password)

    try {
      await connection('users').update({
        name,
        bio,
        password: hashedPassword,
        email,
        whatsapp,
        avatar,
        is_active: 1,
        type_user_id: 1
      }).where({ id })

      return response.status(201).json({
        id
      })
    } catch (error) {
      return response.status(400).json({ error })
    }
  }
}

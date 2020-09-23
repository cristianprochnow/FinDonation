import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'

import { generateUuid } from '@utils/generateUuid'
import { hashPassword } from '@utils/hashPassword'
import { generateToken } from '@utils/generateToken'

import { connection } from '@database/connection'

interface ILogInBodyRequest {
  email: string
  password: string
}
export default class UsersController {
  async index (request: Request, response: Response) {
    async function listActiveUsers () {
      try {
        const usersList = await connection('users')
          .select(
            'id',
            'name',
            'bio',
            'email',
            'whatsapp',
            'avatar'
          )
          .where({
            is_active: 1,
            type_user_id: 1
          })

        return usersList
      } catch (error) {
        console.log('[User List](error) > list all the active users')

        throw new Error()
      }
    }

    try {
      const usersList = await listActiveUsers()

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

    async function insertNewUser () {
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
      } catch (error) {
        console.error('[User Sign Up](error) > insert new user')

        throw new Error()
      }
    }

    try {
      await insertNewUser()

      return response.status(201).json({ id: userId })
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async logIn (request: Request, response: Response) {
    const { SECRET } = process.env

    const logInBodyRequest: ILogInBodyRequest = request.body

    async function selectUserPassword () {
      try {
        const { password } = await connection('users')
          .first('password')
          .where({
            email: logInBodyRequest.email
          })

        return password
      } catch (error) {
        console.error('[User Log In](error) > select password from database')

        throw new Error()
      }
    }

    async function selectUserId () {
      try {
        const { id } = await connection('users')
          .first('id')
          .where({
            email: logInBodyRequest.email
          })

        return id
      } catch (error) {
        console.error('[User Log In](error) > select user id from database')

        throw new Error()
      }
    }

    try {
      const password = await selectUserPassword()

      const isCorrectPassword = await bcrypt.compare(
        logInBodyRequest.password,
        password
      )

      if (isCorrectPassword) {
        const id = await selectUserId()

        const token = generateToken(id, SECRET, '1h')

        return response.status(201).json({ id, token })
      } else {
        console.log('[User Log In](error) > the password is incorrect')

        throw new Error()
      }
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async profile (request: Request, response: Response) {
    const { id } = request.params

    async function selectUserProfileData (id: string) {
      try {
        const userData = await connection('users')
          .first('id', 'name', 'bio', 'email', 'whatsapp', 'avatar')
          .where({ id })

        return userData
      } catch (error) {
        throw new Error()
      }
    }

    try {
      const userData = await selectUserProfileData(id)

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

import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'

import { generateUuid } from '@utils/generateUuid'
import { hashPassword } from '@utils/hashPassword'
import { generateToken } from '@utils/generateToken'

import { connection } from '@database/connection'
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
        throw new Error()
      }
    }

    try {
      const usersList = await listActiveUsers()

      return response.status(200).json(usersList)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async signUp (request: Request, response: Response) {
    interface IUserSignUpBodyRequest {
      name: string
      bio: string
      password: string
      email: string
      whatsapp: string
      avatar: string
    }

    const userId = generateUuid()

    request.body.password = await hashPassword(request.body.password)

    async function insertNewUser (
      userId: string,
      userRegisterData: IUserSignUpBodyRequest
    ) {
      try {
        await connection('users').insert({
          id: userId,
          ...userRegisterData,
          is_active: 1,
          type_user_id: 1
        })
      } catch (error) {
        throw new Error()
      }
    }

    try {
      await insertNewUser(userId, request.body)

      return response.status(201).json({ id: userId })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async logIn (request: Request, response: Response) {
    interface ILogInBodyRequest {
      email: string
      password: string
    }

    const { SECRET } = process.env

    const logInBodyRequest: ILogInBodyRequest = request.body

    async function selectUserPassword (email: string) {
      try {
        const { password } = await connection('users')
          .first('password')
          .where({
            email
          })

        return String(password)
      } catch (error) {
        throw new Error()
      }
    }

    async function selectUserId (email: string) {
      try {
        const { id } = await connection('users')
          .first('id')
          .where({
            email
          })

        return String(id)
      } catch (error) {
        throw new Error()
      }
    }

    try {
      const password = await selectUserPassword(logInBodyRequest.email)

      const isCorrectPassword = await bcrypt.compare(
        logInBodyRequest.password,
        password
      )

      if (isCorrectPassword) {
        const userId = await selectUserId(logInBodyRequest.email)

        const token = generateToken(userId, SECRET, '1h')

        return response.status(201).json({ id: userId, token })
      } else {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).send()
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
      return response.status(400).send()
    }
  }

  async update (request: Request, response: Response) {
    interface IUpdateBodyRequest {
      name: string
      bio: string
      password: string
      email: string
      whatsapp: string
      avatar: string
    }

    const { id } = request.params

    request.body.password = await hashPassword(request.body.password)

    async function updateUserDataFromDatabase (
      userId: string,
      userRequestData: IUpdateBodyRequest
    ) {
      try {
        await connection('users').update({
          ...userRequestData,
          is_active: 1,
          type_user_id: 1
        }).where({ id: userId })
      } catch (error) {
        throw new Error()
      }
    }

    try {
      await updateUserDataFromDatabase(id, request.body)

      return response.status(201).json({ id })
    } catch (error) {
      return response.status(400).send()
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
      return response.status(400).send()
    }
  }
}

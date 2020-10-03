import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'

import { generateUuid } from '@utils/generateUuid'
import { hashPassword } from '@utils/hashPassword'
import { generateToken } from '@utils/generateToken'

import Users from '@models/Users'

const {
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT
} = process.env

const usersModel = new Users()

interface IIndexResponse {
  id: string
  name: string
  bio: string
  email: string
  whatsapp: string
  avatar: string
  avatar_url: string
}

interface ISignUpResponse {
  id: string
}

interface ILogInResponse {
  id: string
  token: string
}

interface IUserProfileResponse {
  id: string
  name: string
  bio: string
  email: string
  whatsapp: string
  avatar: string
}

interface IUserUpdateResponse {
  id: string
}

interface IUserDeactivationResponse {
  id: string
}
export default class UsersController {
  async index (
    request: Request,
    response: Response
  ): Promise<Response<IIndexResponse[]>> {
    try {
      const usersList = await usersModel.listActiveUsers()

      const serializedUsersList = usersList.map(user => {
        return {
          ...user,
          avatar_url: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/uploads/${user.avatar}`
        }
      })

      return response.status(200).json(serializedUsersList)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async signUp (
    request: Request,
    response: Response
  ): Promise<Response<ISignUpResponse>> {
    const userId = generateUuid()

    const { filename } = request.file

    request.body.password = await hashPassword(request.body.password)
    request.body.avatar = filename

    try {
      await usersModel.insertNewUser(userId, request.body)

      return response.status(201).json({ id: userId })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async logIn (
    request: Request,
    response: Response
  ): Promise<Response<ILogInResponse>> {
    const { SECRET } = process.env
    const { email, password } = request.body

    try {
      const passwordFromDatabase = await usersModel.selectUserPasswordByEmail(
        String(email)
      )

      const isCorrectPassword = await bcrypt.compare(
        password,
        passwordFromDatabase
      )

      if (isCorrectPassword) {
        const userId = await usersModel.selectUserIdByEmail(
          String(email)
        )

        const token = generateToken(userId, SECRET, '1h')

        return response.status(201).json({ id: userId, token })
      } else {
        throw new Error()
      }
    } catch (error) {
      return response.status(400).send()
    }
  }

  async profile (
    request: Request,
    response: Response
  ): Promise<Response<IUserProfileResponse>> {
    const { id } = request.params

    try {
      const userData = await usersModel.selectUserProfileDataById(id)

      return response.status(200).json(userData)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async update (
    request: Request,
    response: Response
  ): Promise<Response<IUserUpdateResponse>> {
    const { id } = request.params

    request.body.password = await hashPassword(request.body.password)

    try {
      await usersModel.updateUserDataFromDatabase(id, request.body)

      return response.status(201).json({ id })
    } catch (error) {
      return response.status(400).send()
    }
  }

  async deactivate (
    request: Request,
    response: Response
  ): Promise<Response<IUserDeactivationResponse>> {
    const { id } = request.params

    try {
      await usersModel.deactivateUser(id)

      return response.status(200).json({ id })
    } catch (error) {
      return response.status(400).send()
    }
  }
}

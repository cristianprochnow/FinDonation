import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'

import { generateUuid } from '@utils/generateUuid'
import { hashPassword } from '@utils/hashPassword'
import { generateToken } from '@utils/generateToken'

import { connection } from '@database/connection'

import Users from '@models/Users'

interface IIndexResponse {
  id: string
  name: string
  bio: string
  email: string
  whatsapp: string
  avatar: string
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
    const usersModel = new Users()

    try {
      const usersList = await usersModel.listActiveUsers()

      return response.status(200).json(usersList)
    } catch (error) {
      return response.status(400).send()
    }
  }

  async signUp (
    request: Request,
    response: Response
  ): Promise<Response<ISignUpResponse>> {
    const usersModel = new Users()

    const userId = generateUuid()

    request.body.password = await hashPassword(request.body.password)

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
    const usersModel = new Users()

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
    const usersModel = new Users()

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
    const usersModel = new Users()

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
    const usersModel = new Users()

    const { id } = request.params

    try {
      await usersModel.deactivateUser(id)

      return response.status(200).json({ id })
    } catch (error) {
      return response.status(400).send()
    }
  }
}

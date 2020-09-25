import { connection } from '@database/connection'

interface IListActiveUsersResponse {
  id: string
  name: string
  bio: string
  email: string
  whatsapp: string
  avatar: string
}

interface IUserSignUpBodyRequest {
  name: string
  bio: string
  password: string
  email: string
  whatsapp: string
  avatar: string
}

interface IUserProfileData {
  id: string
  name: string
  bio: string
  email: string
  whatsapp: string
  avatar: string
}

interface IUpdateBodyRequest {
  name: string
  bio: string
  password: string
  email: string
  whatsapp: string
  avatar: string
}

export default class Users {
  async listActiveUsers (): Promise<IListActiveUsersResponse[]> {
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

  async insertNewUser (
    userId: string,
    userRegisterData: IUserSignUpBodyRequest
  ): Promise<void> {
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

  async selectUserPasswordByEmail (email: string): Promise<string> {
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

  async selectUserIdByEmail (email: string): Promise<string> {
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

  async selectUserProfileDataById (
    id: string
  ): Promise<IUserProfileData> {
    try {
      const userData = await connection('users')
        .first('id', 'name', 'bio', 'email', 'whatsapp', 'avatar')
        .where({ id })

      return userData
    } catch (error) {
      throw new Error()
    }
  }

  async updateUserDataFromDatabase (
    userId: string,
    userRequestData: IUpdateBodyRequest
  ): Promise<void> {
    try {
      await connection('users').update({
        ...userRequestData
      }).where({ id: userId })
    } catch (error) {
      throw new Error()
    }
  }

  async deactivateUser (id: string) {
    try {
      await connection('users').update({
        is_active: 0
      }).where({ id })
    } catch (error) {
      throw new Error()
    }
  }
}

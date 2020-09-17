import { connection } from '../database/connection'

interface IUserInformation {
  id: string
  name: string
  password: string
  email: string
  whatsapp: string
  avatar: string
  isActive: number
  typeUserId: number
}

export default class UsersModel {
  async insertUserInformations (userInformation: IUserInformation) {
    const {
      id,
      name,
      password,
      email,
      whatsapp,
      avatar,
      isActive,
      typeUserId
    } = userInformation

    const response = await connection('users').insert({
      id,
      name,
      password,
      email,
      whatsapp,
      avatar,
      is_active: isActive,
      type_user_id: typeUserId
    })

    return response
  }
}

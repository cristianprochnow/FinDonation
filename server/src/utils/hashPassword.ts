import * as bcrypt from 'bcrypt'

export async function hashPassword (password: string) {
  const saltRounds = 12

  const hashedPassword = await bcrypt.hash(
    password,
    saltRounds
  )

  return hashedPassword
}

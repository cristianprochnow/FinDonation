import { v4 as uuidv4 } from 'uuid'

export function generateUuid () {
  const uuid = uuidv4()

  return uuid
}

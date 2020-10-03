import multer from 'multer'
import path from 'path'

import { generateRandomHash } from '@utils/generateRandomHash'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const hash = generateRandomHash(8)

      const filename = `${hash}-${file.originalname}`

      callback(null, filename)
    }
  })
}

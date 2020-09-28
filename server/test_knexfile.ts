import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

module.exports = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'test.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true
}

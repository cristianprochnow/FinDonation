import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'development.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
  }
}

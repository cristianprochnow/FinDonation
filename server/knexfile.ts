import path from 'path'

const {
  DATABASE_CLIENT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST
} = process.env

module.exports = {
  development: {
    client: DATABASE_CLIENT,
    connection: {
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
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

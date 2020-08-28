import path from 'path'

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '0.0.0.0',
      user: 'root',
      password: 'root',
      database: 'findonation'
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

import knex from 'knex'

const knexConfig = require('../../knexfile')

const config = knexConfig.development

const connection = knex(config)

export { connection }

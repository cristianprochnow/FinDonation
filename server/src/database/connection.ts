import knex from 'knex'

const knexConfig = require('../../knexfile')

const { SETUP } = process.env

const config = SETUP === 'test' ? knexConfig.test : knexConfig.development

const connection = knex(config)

export { connection }

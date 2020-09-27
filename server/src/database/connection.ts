import knex from 'knex'

const defaultKnexConfig = require('../../knexfile')
const knexConfigForTests = require('../../test_knexfile')

const { SETUP } = process.env

const config = SETUP === 'test' ? knexConfigForTests : defaultKnexConfig

const connection = knex(config)

export { connection }

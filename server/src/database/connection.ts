import knex from 'knex'
import { knexConfig } from '../../knexfile'

const config = knexConfig.development

const connection = knex(config)

export { connection }

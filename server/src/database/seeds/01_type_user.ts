import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('type_user').insert([
    { id: 0, description: 'admin' },
    { id: 1, description: 'user' },
    { id: 2, description: 'ong' }
  ])
}

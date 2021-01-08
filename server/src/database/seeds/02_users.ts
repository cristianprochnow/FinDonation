import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('users').insert({
    id: '1d99c154-de1d-4680-b050-35b9c94c14e6',
    name: 'FizzBuzz',
    bio: 'Just a famous programming puzzle!',
    password: 'F1zz13u22',
    email: 'contato@fizzbuzz.com',
    whatsapp: '0123-4567',
    avatar: 'image-for-tests.jpg',
    is_active: 1,
    type_user_id: 1
  })
}

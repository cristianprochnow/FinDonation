import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('ongs', (table) => {
    table.uuid('ong_id').primary().notNullable()

    table.string('name', 250).notNullable()
    table.string('email', 250).notNullable()
    table.string('whatsapp', 50).notNullable()
    table.string('password', 100).notNullable()
    table.string('description', 500)
    table.string('image', 100)
    table.string('uf', 2).notNullable()
    table.string('city', 100).notNullable()
    table.string('neighbourhood', 100).notNullable()
    table.string('street', 100).notNullable()

    table.integer('number').notNullable()

    table.decimal('latitude', 15).notNullable()
    table.decimal('longitude', 15).notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('ongs')
}

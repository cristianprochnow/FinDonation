import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('donations', table => {
    table.uuid('id').primary()

    table.string('title', 200).notNullable()
    table.string('description', 600)
    table.string('image', 200)

    table.string('uf', 2).notNullable()
    table.string('city', 50).notNullable()
    table.string('neighbourhood', 50).notNullable()
    table.string('street', 50).notNullable()
    table.string('number').unsigned().notNullable()

    table.decimal('latitude', 20).notNullable()
    table.decimal('longitude', 20).notNullable()

    table.uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('donations')
}

import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('ongs_location', table => {
    table.increments('id').unsigned().primary()

    table.string('uf', 2).notNullable()
    table.string('city', 50).notNullable()
    table.string('neighbourhood', 50).notNullable()
    table.string('street', 50).notNullable()
    table.integer('number').unsigned().notNullable()

    table.decimal('latitude', 20).notNullable()
    table.decimal('longitude', 20).notNullable()

    table.uuid('user_id').notNullable()
    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('ongs_location')
}

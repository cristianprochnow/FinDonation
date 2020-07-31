import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('collect_points', (table) => {
    table.uuid('point_id').primary().notNullable()
    table.uuid('ong_id').notNullable().references('ong_id').inTable('ongs')

    table.string('title', 250).notNullable()
    table.string('description', 500).notNullable()
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

export async function down (knex:Knex) {
  return knex.schema.dropTable('collect_points')
}

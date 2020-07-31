import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('item_category', (table) => {
    table.increments('item_id').primary()

    table.string('title').notNullable()
    table.string('icon').notNullable()
  })
}

export async function down (knex:Knex) {
  return knex.schema.dropTable('item_category')
}

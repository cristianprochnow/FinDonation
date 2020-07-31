import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('item_donations', (table) => {
    table.integer('item_id')
      .notNullable()
      .references('item_id')
      .inTable('item_category')

    table.uuid('donation_id')
      .notNullable()
      .references('donation_id')
      .inTable('donations')
  })
}

export async function down (knex:Knex) {
  return knex.schema.dropTable('item_donations')
}

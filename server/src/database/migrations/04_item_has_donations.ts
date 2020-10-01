import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('item_has_donations', table => {
    table.increments('id').primary()

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('item_category')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

    table.uuid('donation_id')
      .notNullable()
      .references('id')
      .inTable('donations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('item_has_donations')
}

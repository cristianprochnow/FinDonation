import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('item_category', table => {
    table.integer('id').primary()

    table.string('title', 20).notNullable()
    table.string('icon', 50).notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('item_category')
}

import Knex from 'knex'

async function up (knex: Knex) {
  return knex.schema.createTable('item_category', (table) => {
    table.increments('item_id').primary()

    table.string('title').notNullable()
    table.string('icon').notNullable()
  })
}

async function down (knex:Knex) {
  return knex.schema.dropTable('item_category')
}

export {
  up,
  down
}

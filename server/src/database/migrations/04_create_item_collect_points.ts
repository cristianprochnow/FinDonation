import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('collect_points', (table) => {
    table.integer('item_id')
      .notNullable()
      .references('item_id')
      .inTable('item_category')

    table.uuid('point_id')
      .notNullable()
      .references('point_id')
      .inTable('collect_points')
  })
}

export async function down (knex:Knex) {
  return knex.schema.dropTable('item_collect_points')
}

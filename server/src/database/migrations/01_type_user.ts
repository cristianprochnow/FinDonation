import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('type_user', table => {
    table.integer('id').primary()

    table.string('description', 10).notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('type_user')
}

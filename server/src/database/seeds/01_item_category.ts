import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('item_category').insert([
    { id: 1, title: 'Roupa', icon: 'cloth.svg' },
    { id: 2, title: 'Material de construção', icon: 'construction-material.svg' },
    { id: 3, title: 'Decoração', icon: 'decoration.svg' },
    { id: 4, title: 'Eletrônico', icon: 'electronic.svg' },
    { id: 5, title: 'Alimento', icon: 'food.svg' },
    { id: 6, title: 'Mobília', icon: 'furniture.svg' },
    { id: 7, title: 'Brinquedo', icon: 'toy.svg' },
    { id: 8, title: 'Utilidade geral', icon: 'util.svg' },
    { id: 9, title: 'Outro', icon: 'other.svg' }
  ])
}

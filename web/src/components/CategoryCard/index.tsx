import React from 'react'

import './styles.css'

import { ICategoryCard } from './types'

const CategoryCard: React.FC<ICategoryCard> = ({
  icon,
  label,
  onHandleClick
}) => {
  return (
    <div className="category-card" onClick={onHandleClick}>
      <img src={icon} alt={label} />

      <strong>{label}</strong>
    </div>
  )
}

export default CategoryCard

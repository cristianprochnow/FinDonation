import React, { LiHTMLAttributes } from 'react'

import './styles.css'

import {
  CategoryCard as CategoryCardComponent,
  CardIcon,
  CardLabel
} from './styles'

interface CategoryCardProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string
  iconUrl: string
  isCardSelected: boolean
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  iconUrl,
  isCardSelected,
  onClick,
  ...rest
}) => {
  return (
    <CategoryCardComponent
      onClick={onClick}
      className={isCardSelected ? 'selected' : ''}
      {...rest}
    >
      <CardIcon
        src={iconUrl}
        alt={label}
      />
      <CardLabel>{label}</CardLabel>
    </CategoryCardComponent>
)
}

export default CategoryCard

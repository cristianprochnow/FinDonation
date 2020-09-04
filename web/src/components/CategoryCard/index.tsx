import React, { LiHTMLAttributes } from 'react'

import {
  CategoryCard as CategoryCardComponent,
  CardIcon,
  CardLabel
} from './styles'

interface CategoryCardProps extends LiHTMLAttributes<HTMLLIElement> {
  label: string
  iconUrl: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  iconUrl,
  onClick
}) => {
  return (
    <CategoryCardComponent
      onClick={onClick}
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

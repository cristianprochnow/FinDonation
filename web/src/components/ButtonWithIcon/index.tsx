import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

import { ButtonWithIcon as ButtonWithIconComponent } from './styles'

interface ButtonWithIconsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon: IconType
  iconSize?: number
  isOutline?: boolean
}

const ButtonWithIcon: React.FC<ButtonWithIconsProps> = ({
  label,
  Icon,
  iconSize = 24,
  onClick,
  isOutline,
  ...rest
}) => {
  return (
    <ButtonWithIconComponent
      style={
        isOutline
          ? {
            color: '#5B4FDB',
            border: '4px solid #5B4FDB',
            backgroundColor: 'transparent'
          } : {}
      }
      onClick={onClick}
      {...rest}
    >
      <Icon size={iconSize} />
      {label}
    </ButtonWithIconComponent>
  )
}

export default ButtonWithIcon

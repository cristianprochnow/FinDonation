import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

import { ButtonWithIcon as ButtonWithIconComponent } from './styles'
import './styles.css'

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
      className={ isOutline ? 'outline' : '' }
      onClick={onClick}
      {...rest}
    >
      <Icon size={iconSize} />
      {label}
    </ButtonWithIconComponent>
  )
}

export default ButtonWithIcon

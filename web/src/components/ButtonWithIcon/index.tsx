import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

import { ButtonWithIcon as ButtonWithIconComponent } from './styles'

interface ButtonWithIconsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon: IconType
  iconSize?: number
}

const ButtonWithIcon: React.FC<ButtonWithIconsProps> = ({
  label,
  Icon,
  iconSize = 24,
  onClick,
  ...rest
}) => {
  return (
    <ButtonWithIconComponent
      onClick={onClick}
      {...rest}
    >
      <Icon size={iconSize} />
      {label}
    </ButtonWithIconComponent>
  )
}

export default ButtonWithIcon

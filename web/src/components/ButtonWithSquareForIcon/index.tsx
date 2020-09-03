import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

import {
  ButtonWithSquareForIcon as ButtonWithSquareForIconComponent,
  IconBox,
  LabelBox,
  Label
} from './styles'

interface ButtonWithSquareForIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  Icon: IconType
  iconSize?: number
}

const ButtonWithSquareForIcon: React.FC<ButtonWithSquareForIconProps> = ({
  label,
  Icon,
  iconSize = 24,
  onClick
}) => {
  return (
    <ButtonWithSquareForIconComponent onClick={onClick}>
      <IconBox>
        <Icon size={iconSize} />
      </IconBox>

      <LabelBox>
        <Label>{label}</Label>
      </LabelBox>
    </ButtonWithSquareForIconComponent>
  )
}

export default ButtonWithSquareForIcon

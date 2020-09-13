import React, { ButtonHTMLAttributes } from 'react'

import { Button as ButtonComponent } from './styles'

import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isOutline?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  isOutline,
  onClick,
  ...rest
}) => {
  return (
    <ButtonComponent
      className={isOutline ? 'outline' : ''}
      onClick={onClick}
      {...rest}
    >
      {label}
    </ButtonComponent>
  )
}

export default Button

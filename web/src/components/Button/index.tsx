import React from 'react'

import './styles.css'

import { IButton } from './types'

const Button: React.FC<IButton> = ({
  label,
  isOutline,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={isOutline ? 'outline' : ''}
      {...rest}
    >
      {children} {" "} {label}
    </button>
  )
}

export default Button

import React from 'react'

import './styles.css'

import { IButton } from './types'

const Button: React.FC<IButton> = ({
  label,
  isActive,
  isOutline,
  children,
  ...rest
}) => {
  return (
    <button
      type="submit"
      className={isOutline ? 'outline' : ''}
      disabled={isActive ? false : true}
      {...rest}
    >
      {children} {" "} {label}
    </button>
  )
}

export default Button

import React from 'react'

import './styles.css'

import { IButtonWithIcon } from './types'

const ButtonWithIcon: React.FC<IButtonWithIcon> = ({
  label,
  Icon,
  iconSize,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
    >
      <Icon
        size={iconSize}
      /> {" "} {label}
    </button>
  )
}

export default ButtonWithIcon

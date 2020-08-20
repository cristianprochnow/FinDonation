import React from 'react'

import './styles.css'

import { IActionButton } from './types'

const ActionButton: React.FC<IActionButton> = ({
  label,
  isActive,
  isOutline,
  ...rest
}) => {
  return (
    <button
      type="submit"
      className="action-button"
      disabled={isActive ? false : true}
      {...rest}
    >{label}</button>
  )
}

export default ActionButton

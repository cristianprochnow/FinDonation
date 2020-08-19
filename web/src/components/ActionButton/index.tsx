import React, { ButtonHTMLAttributes } from 'react'

import './styles.css'

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isActive?: boolean
}

const ActionButton: React.FC<IActionButton> = ({
  label,
  isActive,
  children,
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

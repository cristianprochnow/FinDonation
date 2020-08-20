import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  isActive?: boolean
  isOutline?: boolean
}

export { IButton }

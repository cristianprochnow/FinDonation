import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  isOutline?: boolean
}

export { IButton }

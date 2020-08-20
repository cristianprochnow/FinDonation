import { ButtonHTMLAttributes } from 'react'

interface IActionButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isActive?: boolean
  isOutline?: boolean
}

export { IActionButton }

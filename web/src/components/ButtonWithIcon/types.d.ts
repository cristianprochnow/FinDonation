import { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface IButtonWithIcon extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  Icon: IconType
  iconSize?: string|number
}

export { IButtonWithIcon }

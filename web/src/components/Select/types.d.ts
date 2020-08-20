import { SelectHTMLAttributes } from 'react'

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
}

export { ISelect }

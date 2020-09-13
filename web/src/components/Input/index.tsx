import React, { InputHTMLAttributes } from 'react'

import {
  InputBlock,
  Label,
  Input as InputComponent,
  Example
} from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  example?: string
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  example,
  ...rest
}) => {
  return (
    <InputBlock>
      <Label htmlFor={name}>{label}</Label>
      <InputComponent
        id={name}
        name={name}
        {...rest}
      />
      <Example>{example}</Example>
    </InputBlock>
  )
}

export default Input

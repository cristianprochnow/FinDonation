import React, { InputHTMLAttributes, useState } from 'react'

import {
  InputBlock,
  Label,
  Input as InputComponent,
  Example,
  EyeButton
} from './styles'

import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  example?: string
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  example,
  value,
  onChange,
  ...rest
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  function handleTogglePasswordView() {
    if (isPasswordVisible) {
      setPasswordVisible(false)
    } else {
      setPasswordVisible(true)
    }
  }

  return (
    <InputBlock>
      <Label htmlFor={name}>{label}</Label>
      <InputComponent
        type={
          isPasswordVisible
          ? 'text'
          : 'password'
        }
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <EyeButton
        type="button"
        onClick={handleTogglePasswordView}
      >
        {
          isPasswordVisible
          ? <RiEyeOffLine size={32} />
          : <RiEyeLine size={32} />
        }
      </EyeButton>
      <Example>{example}</Example>
    </InputBlock>
  )
}

export default Input

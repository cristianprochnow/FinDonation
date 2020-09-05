import React, { SelectHTMLAttributes } from 'react'

import {
  SelectBlock,
  Label,
  Select as SelectComponent
} from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  children,
  onChange,
  ...rest
}) => {
  return (
    <SelectBlock>
      <Label htmlFor={name}>{label}</Label>
      <SelectComponent
        defaultValue=""
        id={name}
        name={name}
        onChange={onChange}
        {...rest}
      >
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {children}
      </SelectComponent>
    </SelectBlock>
  )
}

export default Select

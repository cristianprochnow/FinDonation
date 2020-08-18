import React, { SelectHTMLAttributes } from 'react'

import './styles.css'

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: {
    value: string
    label: string
  }[]
}

const Select: React.FC<ISelect> = ({
  name,
  label,
  options,
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select defaultValue="" name={name} id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>

        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select

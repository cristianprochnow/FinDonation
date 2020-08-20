import React from 'react'

import './styles.css'

import { ISelect } from './types'

const Select: React.FC<ISelect> = ({
  name,
  label,
  children,
  ...rest
}) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select
        defaultValue=""
        name={name}
        id={name}
        {...rest}
      >
        <option value="" disabled hidden>Selecione uma opção</option>

        {children}
      </select>
    </div>
  )
}

export default Select

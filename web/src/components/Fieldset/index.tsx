import React, { FieldsetHTMLAttributes } from 'react'

import {
  Fieldset as FieldsetComponent,
  Legend
} from './styles'

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: string
}

const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  children,
  ...rest
}) => {
  return (
    <FieldsetComponent {...rest}>
      <Legend>{legend}</Legend>

      {children}
    </FieldsetComponent>
  )
}

export default Fieldset

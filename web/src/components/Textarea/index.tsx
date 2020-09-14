import React, { TextareaHTMLAttributes } from 'react'

import {
  Label,
  TextAreaBlock,
  TextArea as TextAreaComponent,
  Description
} from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  description?: string
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  description,
  value,
  onChange,
  ...rest
}) => {
  return (
    <TextAreaBlock>
      <Label htmlFor={name}>{label}</Label>
      <TextAreaComponent
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <Description>{description}</Description>
    </TextAreaBlock>
  )
}

export default Textarea

import React from 'react'

import {
  Label,
  TextAreaBlock,
  TextArea as TextAreaComponent,
  Description
} from './styles'

const Textarea: React.FC = () => {
  return (
    <TextAreaBlock>
      <Label>Textarea</Label>
      <TextAreaComponent />
      <Description>Descrição para exemplo</Description>
    </TextAreaBlock>
  )
}

export default Textarea

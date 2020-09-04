import React from 'react'

import { Title as TitleComponent } from './styles'

interface TitleProps {
  text: string
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <TitleComponent>{text}</TitleComponent>
}

export default Title

import React from 'react'

import { Title as TitleComponent } from './styles'

const Title: React.FC = ({ children }) => {
  return <TitleComponent>{children}</TitleComponent>
}

export default Title

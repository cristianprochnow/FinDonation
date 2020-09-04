import React from 'react'

import { Description as DescriptionComponent } from './styles'

const Description: React.FC = ({ children }) => {
  return <DescriptionComponent>{children}</DescriptionComponent>
}

export default Description

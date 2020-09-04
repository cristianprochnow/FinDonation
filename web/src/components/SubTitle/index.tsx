import React from 'react'

import {
  SubTitle as SubTitleComponent
} from './styles'

const SubTitle: React.FC = ({ children }) => {
  return <SubTitleComponent>{children}</SubTitleComponent>
}

export default SubTitle

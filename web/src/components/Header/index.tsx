import React from 'react'

import {
  Header as HeaderComponent,
  Logo,
  ResponsiveLogo
} from './styles'
import BackLink from '../BackLink'

import logo from '../../assets/images/logos/findonation-with-label.svg'

const Header: React.FC = ({ children }) => {
  return (
    <HeaderComponent>
      <BackLink />

      {
        children
          ? <ResponsiveLogo src={logo} />
          : <Logo src={logo} />
      }

      {children}
    </HeaderComponent>
  )
}

export default Header

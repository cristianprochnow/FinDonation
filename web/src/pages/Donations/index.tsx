import React from 'react'

import {
  Container,
  Header,
  Logo
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import BackLink from '../../components/BackLink'

import {
  RiAddCircleLine
} from 'react-icons/ri'

import logo from '../../assets/images/logos/findonation-with-label.svg'

const Donations: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackLink />

        <Logo src={logo} />

        <ButtonWithIcon
          label="Doar"
          Icon={RiAddCircleLine}
        />
      </Header>
    </Container>
  )
}

export default Donations

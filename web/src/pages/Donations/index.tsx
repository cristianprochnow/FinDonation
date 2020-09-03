import React from 'react'

import {
  Container,
  Header,
  BackLink,
  Logo
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'

import {
  RiArrowLeftLine,
  RiAddCircleLine
} from 'react-icons/ri'

import logo from '../../assets/images/logos/findonation-with-label.svg'

const Donations: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackLink to="/">
          <RiArrowLeftLine size={24} />
          Voltar à página anterior
        </BackLink>

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

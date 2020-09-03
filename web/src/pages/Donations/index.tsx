import React from 'react'

import {
  Container,
  Header,
  BackLink,
  Logo,
  ButtonWithIcon
} from './styles'

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

        <ButtonWithIcon>
          <RiAddCircleLine size={24} />
          Doar
        </ButtonWithIcon>
      </Header>
    </Container>
  )
}

export default Donations

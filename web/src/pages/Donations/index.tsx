import React from 'react'

import {
  Container
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'

import {
  RiAddCircleLine
} from 'react-icons/ri'

const Donations: React.FC = () => {
  return (
    <Container>
      <Header>
        <ButtonWithIcon
          label="Doar"
          Icon={RiAddCircleLine}
        />
      </Header>
    </Container>
  )
}

export default Donations

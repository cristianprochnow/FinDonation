import React from 'react'

import {
  Container,
  SearchContainer,
  SubContainer,
  SubTitle,
  Card,
  CardIcon,
  CardLabel,
  CardContainer
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'
import Description from '../../components/Description'

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

      <SearchContainer>
        <SubContainer>
          <SubTitle>Categorias</SubTitle>
          <Description>
            Selecione as categorias de itens que você deseja.
          </Description>

          <CardContainer>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Roupas</CardLabel>
            </Card>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Roupas</CardLabel>
            </Card>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Roupas</CardLabel>
            </Card>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Eletrônicos</CardLabel>
            </Card>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Roupas</CardLabel>
            </Card>
            <Card>
              <CardIcon
                src="http://localhost:3333/icons/cloth.svg"
                alt="Roupas"
              />
              <CardLabel>Roupas</CardLabel>
            </Card>
          </CardContainer>
        </SubContainer>
      </SearchContainer>
    </Container>
  )
}

export default Donations

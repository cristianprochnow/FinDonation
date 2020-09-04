import React from 'react'

import {
  Container,
  SearchContainer,
  SubContainer,
  CardContainer
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'
import Description from '../../components/Description'
import SubTitle from '../../components/SubTitle'
import CategoryCard from '../../components/CategoryCard'

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
            <CategoryCard
              label="Roupas"
              iconUrl="http://localhost:3333/icons/cloth.svg"
              isCardSelected={true}
            />
            <CategoryCard
              label="Roupas"
              iconUrl="http://localhost:3333/icons/cloth.svg"
              isCardSelected={false}
            />
          </CardContainer>
        </SubContainer>
      </SearchContainer>
    </Container>
  )
}

export default Donations

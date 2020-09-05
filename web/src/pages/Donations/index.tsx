import React from 'react'

import {
  Container,
  SearchContainer,
  SubContainer,
  CardContainer,
  SelectContainer,
  SelectBlock,
  Label,
  Select
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'
import Description from '../../components/Description'
import SubTitle from '../../components/SubTitle'
import CategoryCard from '../../components/CategoryCard'

import {
  RiAddCircleLine,
  RiSearchLine
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

        <SubContainer>
          <SubTitle>Localização</SubTitle>
          <Description>
            Selecione o estado e a cidade que vocẽ está.
          </Description>

          <SelectContainer>
            <SelectBlock>
              <Label htmlFor="uf">UF</Label>
              <Select id="uf">
                <option>Selecione uma localização</option>
                <option>Selecione uma localização</option>
              </Select>
            </SelectBlock>

            <SelectBlock>
              <Label htmlFor="city">Cidade</Label>
              <Select id="city">
                <option>Selecione uma localização</option>
              </Select>
            </SelectBlock>

            <ButtonWithIcon
              label="Buscar"
              Icon={RiSearchLine}
            />
          </SelectContainer>
        </SubContainer>
      </SearchContainer>
    </Container>
  )
}

export default Donations

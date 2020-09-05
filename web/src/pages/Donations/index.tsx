import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'

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

interface UfProps {
  sigla: string
  nome: string
}

interface CityProps {
  nome: string
}

const Donations: React.FC = () => {
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])

  const [selectedLocation, setSelectedLocation] = useState({
    uf: '',
    city: ''
  })

  function handleSetSelectedLocation(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target

    setSelectedLocation({
      ...selectedLocation,
      [name]: value
    })

    console.log(selectedLocation)
  }

  useEffect(() => {
    try {
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(({ data }) => {
          setUfs(data)
        })
        .catch(() => {
          throw new Error()
        })
    } catch (error) {
      console.log(
        '\n',
        '[ufs request] > a error has ocurred while the request',
        `[error](ufs request)> ${error}`,
        '\n'
      )
    }
  }, [])

  useEffect(() => {
    try {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${
        selectedLocation.uf
      }/municipios`)
        .then(({ data }) => {
          setCities(data)
        })
        .catch(() => {
          throw new Error()
        })
    } catch (error) {
      console.log(
        '\n',
        '[cities request] > a error has ocurred while the request',
        `[error](cities request)> ${error}`,
        '\n'
      )
    }
  }, [selectedLocation.uf])

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
              <Select
                defaultValue=""
                id="uf"
                name="uf"
                onChange={handleSetSelectedLocation}
              >
                <option value="" disabled hidden>
                  Selecione uma opção
                </option>

                {ufs.map((uf: UfProps) => {
                  let { sigla, nome } = uf

                  return (
                    <option key={sigla} value={sigla}>
                      {nome}
                    </option>
                  )
                })}
              </Select>
            </SelectBlock>

            <SelectBlock>
              <Label htmlFor="city">Cidade</Label>
              <Select
                defaultValue=""
                id="city"
                name="city"
                onChange={handleSetSelectedLocation}
              >
                <option value="" disabled hidden>
                  Selecione uma opção
                </option>

                {cities.map((city: CityProps) => {
                  let { nome } = city

                  return (
                    <option key={nome} value={nome}>
                      {nome}
                    </option>
                  )
                })}
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

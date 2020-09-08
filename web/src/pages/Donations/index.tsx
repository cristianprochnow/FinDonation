import React, { useState, useEffect, ChangeEvent } from 'react'
import axios from 'axios'

import {
  Container,
  SearchContainer,
  SubContainer,
  CardContainer,
  SelectContainer,
  DonationsContainer,
  Donation,
  DonationHeader,
  TextBox,
  DonationTitle,
  DonationDescription,
  DonationImage,
  DonationFooter,
  ButtonsBox,
  ForwardLink,
  ImageBox,
  ONGIdentifier,
  BottomLine
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'
import Description from '../../components/Description'
import SubTitle from '../../components/SubTitle'
import CategoryCard from '../../components/CategoryCard'
import Select from '../../components/Select'

import {
  RiAddCircleLine,
  RiSearchLine,
  RiWhatsappLine,
  RiMailLine,
  RiArrowRightLine,
  RiHomeHeartLine
} from 'react-icons/ri'

import image from '../../assets/images/image.jpg'

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
            <Select
              name="uf"
              label="UF"
              onChange={handleSetSelectedLocation}
            >
              {ufs.map((uf: UfProps) => {
                let { sigla, nome } = uf

                return (
                  <option key={sigla} value={sigla}>
                    {nome}
                  </option>
                )
              })}
            </Select>

            <Select
              name="city"
              label="Cidade"
              onChange={handleSetSelectedLocation}
            >
              {cities.map((city: CityProps) => {
                let { nome } = city

                return (
                  <option key={nome} value={nome}>
                    {nome}
                  </option>
                )
              })}
            </Select>

            <ButtonWithIcon
              label="Buscar"
              Icon={RiSearchLine}
            />
          </SelectContainer>
        </SubContainer>
      </SearchContainer>

      <DonationsContainer>
        <Donation>
          <DonationHeader>
            <ImageBox>
              <DonationImage src={image} />
            </ImageBox>

            <TextBox>
              <DonationTitle>Sofá de camurça</DonationTitle>
              <DonationDescription>
                Um simples sofá. Bonito, charmoso, cheiroso e gostoso.
                Tudo de melhor para o seu conforto e o de sua família.
              </DonationDescription>
            </TextBox>
          </DonationHeader>

          <DonationFooter>
            <ButtonsBox>
              <ButtonWithIcon
                style={{ backgroundColor: '#25D366' }}
                label="WhatsApp"
                Icon={RiWhatsappLine}
              />
              <ButtonWithIcon
                style={{ backgroundColor: '#34B7F1' }}
                label="Email"
                Icon={RiMailLine}
              />
            </ButtonsBox>

            <BottomLine>
              <ONGIdentifier>
                <RiHomeHeartLine size={32} />
              </ONGIdentifier>

              <ForwardLink>
                Ver mais
                <RiArrowRightLine size={24} />
              </ForwardLink>
            </BottomLine>
          </DonationFooter>
        </Donation>
      </DonationsContainer>
    </Container>
  )
}

export default Donations

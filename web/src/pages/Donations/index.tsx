import React, { useState, useEffect, ChangeEvent } from 'react'
import Modal, { Styles as ModalStyles } from 'react-modal'
import axios from 'axios'

import { useAuth } from '../../contexts/auth'

import {
  Container,
  SearchContainer,
  SubContainer,
  CardContainer,
  SelectContainer,
  DonationsContainer,
  ButtonsContainer,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalForm,
  ModalSignUpQuestion,
  ModalSignUpButtons
} from './styles'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import Header from '../../components/Header'
import Description from '../../components/Description'
import SubTitle from '../../components/SubTitle'
import CategoryCard from '../../components/CategoryCard'
import Select from '../../components/Select'
import DonationItem from '../../components/DonationItem'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import Button from '../../components/Button'
import CloseButton from '../../components/CloseButton'

import {
  RiAddCircleLine,
  RiSearchLine,
  RiAccountCircleLine,
  RiUser3Line,
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

Modal.setAppElement('#root')

const Donations: React.FC = () => {
  const { signed } = useAuth()

  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])

  const [modalLoginData, setModalLoginData] = useState({
    email: '',
    password: ''
  })

  function handleSetModalLoginData(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setModalLoginData({
      ...modalLoginData,
      [name]: value
    })
  }

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
      console.error(`[ufs request] > ${error}`)
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
      console.error(`[cities request] > ${error}`)
    }
  }, [selectedLocation.uf])

  const [modalIsOpen, setModalOpen] = useState(true)
  const customStylesOfModal: ModalStyles = {
    content: {
      width: 'auto',
      maxWidth: '480px',
      margin: 'auto',

      border: 0,
      borderRadius: '1.6rem',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
  }

  function openModal(): void {
    setModalOpen(true)
  }

  function closeModal(): void {
    setModalOpen(false)
  }

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        style={customStylesOfModal}
      >
        <ModalContainer>
          <CloseButton
            style={{ transform: 'translate(30%, -30%)' }}
            onClick={closeModal}
          />

          <ModalHeader>
            <ModalTitle>Só resta mais um passo...</ModalTitle>
            <ModalDescription>antes de mudar a vida de alguém.</ModalDescription>
          </ModalHeader>

          <ModalForm onSubmit={event => event.preventDefault()}>
            <Input
              label="E-mail"
              name="email"
              example="exemplo@dominio.com"
              value={modalLoginData.email}
              onChange={handleSetModalLoginData}
            />
            <PasswordInput
              label="Senha"
              name="password"
              value={modalLoginData.password}
              onChange={handleSetModalLoginData}
            />

            <Button
              style={{ width: '100%' }}
              label="Entrar"
              disabled={
                modalLoginData.email === ''
                || modalLoginData.password === ''
              }
            />
          </ModalForm>

          <SubContainer>
            <ModalSignUpQuestion>
              Ainda não possui uma conta? Registre-se:
            </ModalSignUpQuestion>

            <ModalSignUpButtons>
              <ButtonWithIcon
                label="Sou doador(a)"
                Icon={RiUser3Line}
                isOutline={true}
              />
              <ButtonWithIcon
                label="Sou uma ONG"
                Icon={RiHomeHeartLine}
              />
            </ModalSignUpButtons>
          </SubContainer>
        </ModalContainer>
      </Modal>

      <Header>
        <ButtonsContainer>
          {
            signed
              ? (
                <ButtonWithIcon
                  label="Perfil"
                  isOutline={true}
                  Icon={RiAccountCircleLine}
                />
              ) : null
          }

          <ButtonWithIcon
            label="Doar"
            Icon={RiAddCircleLine}
            onClick={
              signed
                ? () => console.info('Show')
                : () => openModal()
            }
          />
        </ButtonsContainer>
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

          <SelectContainer onSubmit={event => event.preventDefault()}>
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
              disabled={selectedLocation.uf === ''}
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
              disabled={
                selectedLocation.uf === ''
                || selectedLocation.city === ''
              }
            />
          </SelectContainer>
        </SubContainer>
      </SearchContainer>

      <DonationsContainer>
        <DonationItem
          id={2}
          title="Sofá"
          description="É um anúncio show."
          image={image}
          email="contato@ong.com.br"
          whatsapp="47999999999"
        />
      </DonationsContainer>
    </Container>
  )
}

export default Donations

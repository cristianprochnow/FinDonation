import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import Modal, { Styles as ModalStyles } from 'react-modal'
import axios from 'axios'
import { api } from '../../services/api'
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
  LogOutButton
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
import LinkWithIcon from '../../components/LinkWithIcon'
import {
  RiAddCircleLine,
  RiSearchLine,
  RiAccountCircleLine,
  RiLogoutBoxLine,
  RiFolderLine
} from 'react-icons/ri'

interface UfProps {
  sigla: string
  nome: string
}

interface CityProps {
  nome: string
}

interface DonationProps {
  id: string
  title: string
  description: string
  email: string
  whatsapp: string
  image_url: string
}

interface ItemCategory {
  id: number
  title: string
  icon_url: string
}

Modal.setAppElement('#root')

const Donations: React.FC = () => {
  const history = useHistory()

  const { signed, user, logIn, logOut } = useAuth()

  const [donations, setDonations] = useState<DonationProps[]>([])
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState<Array<ItemCategory>>([])
  const [selectedCategories, setSelectedCategories] = useState<Array<number>>([])

  const [modalLoginData, setModalLoginData] = useState({
    email: '',
    password: ''
  })

  function handleNavigateToUserSignUp() {
    history.push(`user/signup`)
  }

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

  function handleLogOut () {
    try {
      logOut()

      history.push('/')
    } catch (error) {
      console.log('[logout] > An error has been ocurred...')
    }
  }

  function handleNavigateToProfile(uuid: string) {
    history.push(`/user/profile/${uuid}`)
  }

  function handleNavigateToDonationCreation() {
    history.push('/donation/create')
  }

  function handleNavigateToMyDonations(userId: string) {
    const myDonationPath = `user/my-donations/${userId}`

    history.push(myDonationPath)
  }

  async function handleSubmitModalLoginForm(event: FormEvent) {
    event.preventDefault()

    const { email, password } = modalLoginData

    try {
      await logIn(email, password)

      setModalOpen(false)

      history.push('/donation/create')
    } catch (error) {
      console.log('[login] > Senha ou e-mail inválidos!')
    }
  }

  // fetch donations from database
  useEffect(() => {
    api
      .get('/donations')
      .then( ({ data }) => setDonations(data) )
      .catch( error => console.log(`[fetch donations] > ${error}`) )
  }, [])

  // fetch states from IBGE API
  // <https://servicodados.ibge.gov.br/api/docs>
  useEffect(() => {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

    axios
      .get(url)
      .then( ({ data }) => setUfs(data) )
      .catch( error => console.log(`[fetch states from IBGE] > ${error}`) )
  }, [])

  // fetch cities from IBGE API by selected state
  useEffect(() => {
    const uf = selectedLocation.uf
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

    axios
      .get(url)
      .then( ({ data }) => setCities(data) )
      .catch( error => console.log(`[fetch cities by state from IBGE] > ${error}`) )
  }, [selectedLocation.uf])

  const [modalIsOpen, setModalOpen] = useState(false)
  const customStylesOfModal: ModalStyles = {
    content: {
      width: 'auto',
      maxWidth: '480px',
      margin: 'auto',

      border: 0,
      borderRadius: '1.6rem',

      overflow: 'hidden'
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

  // fetch items categories
  useEffect(() => {
    api
      .get('/items')
      .then( ({ data }) => setCategories(data) )
      .catch( error => console.log(`[items categories] > ${error}`) )
  }, [])

  function isSelectedCategory(
    categoryId: number,
    selectedCategories: Array<number>
  ) {
    const isItemCategorySelected = selectedCategories.includes(categoryId)

    return (isItemCategorySelected) ? true : false
  }

  function handleSelectCategory(
    categoryId: number,
    selectedCategories: Array<number>
  ) {
    const isCategoryIdInsideOfArray = selectedCategories.includes(categoryId)

    if (isCategoryIdInsideOfArray) {
      setSelectedCategories(
        selectedCategories
          .filter( category => category !== categoryId )
      )
    } else {
      setSelectedCategories([categoryId, ...selectedCategories])
    }
  }

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        style={customStylesOfModal}
      >
        <ModalContainer>
          <CloseButton
            style={{ transform: 'translate(50%, -50%)' }}
            onClick={closeModal}
          />

          <ModalHeader>
            <ModalTitle>Só resta mais um passo...</ModalTitle>
            <ModalDescription>antes de mudar a vida de alguém.</ModalDescription>
          </ModalHeader>

          <ModalForm onSubmit={async event => handleSubmitModalLoginForm(event)}>
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
              Ainda não possui uma conta?
            </ModalSignUpQuestion>

            <Button
              style={{ width: '100%' }}
              label="Cadastrar-se"
              isOutline={true}
              onClick={handleNavigateToUserSignUp}
            />
          </SubContainer>
        </ModalContainer>
      </Modal>

      <Header>
        <ButtonsContainer>
          {
            signed
              ? (
                <>
                  <LogOutButton onClick={handleLogOut}>
                    <RiLogoutBoxLine size={24} />
                    Sair
                  </LogOutButton>

                  <LinkWithIcon
                    label="Perfil"
                    Icon={RiAccountCircleLine}
                    onClick={() => handleNavigateToProfile(user?.id as string)}
                  />

                  <ButtonWithIcon
                    label="Minhas doações"
                    isOutline={true}
                    Icon={RiFolderLine}
                    onClick={() => handleNavigateToMyDonations(user?.id as string)}
                  />
                </>
              ) : null
          }

          <ButtonWithIcon
            label="Doar"
            Icon={RiAddCircleLine}
            onClick={
              signed
                ? () => handleNavigateToDonationCreation()
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
            {
              categories.map( category => (
                <CategoryCard
                  key={category.id}
                  label={category.title}
                  iconUrl={category.icon_url}
                  onClick={ () => handleSelectCategory(
                    category.id,
                    selectedCategories
                  ) }
                  isCardSelected={ isSelectedCategory(
                    category.id,
                    selectedCategories
                  ) ? true : false }
                />
              ) )
            }
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
        {donations.map(donation => (
          <DonationItem
            key={donation.id}
            id={donation.id}
            title={donation.title}
            description={donation.description}
            image={donation.image_url}
            email={donation.email}
            whatsapp={donation.whatsapp}
          />
        ))}
      </DonationsContainer>
    </Container>
  )
}

export default Donations

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
  const [categories, setCategories] = useState<ItemCategory[]>([])

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

  useEffect(() => {
    api.get('/donations')
      .then(response => {
        setDonations(response.data)
      })
      .catch(error => {
        console.log('[donations] > It is not possible to request the donations list...')
        console.log(error)
      })
  }, [])

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
                  isCardSelected={true}
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

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  RiWhatsappLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiMailLine, RiArrowGoForwardLine, RiInformationLine
} from 'react-icons/ri'

import './styles.css'

import Modal, { Styles as ModalStyles } from 'react-modal'
import Header from '../../components/Header'
import ButtonWithIcon from '../../components/ButtonWithIcon'

import {
  ContactText,
  Text,
  ContactBox,
  ContactIcon,
  Container,
  Photo,
  ProfileContainer,
  UserBio,
  UserContact,
  UserName,
  UserPhoto,
  UserProfileEditButtons,
  UserSubject,
  ModalContainer,
  ModalTitle,
  ModalAlert,
  ModalButtons,
  ModalInfo
} from './styles'

import image from '../../assets/images/image.jpg'
import { api } from '../../services/api'

const UserProfile: React.FC = () => {
  const history = useHistory()

  const [user, setUser] = useState({
    id: '',
    name: '',
    bio: '',
    email: '',
    whatsapp: ''
  })
  const userId = sessionStorage.getItem('FinDonation@user:id')

  function handleNavigateToUserUpdate(uuid: string) {
    history.push(`/user/update/${uuid}`)
  }

  function handleDeactivateAccount(uuid: string) {
    api.post(`/users/deactivate/${uuid}`)
      .then(() => {
        alert('✨ Perfil desativado com sucesso.')

        sessionStorage.clear()
        history.push('/')
      }).catch(error => {
        console.error(`[DEACTIVATE ACCOUNT] > ${error}`)
      })
  }

  useEffect(() => {
    api.get(`/users/profile/${userId}`).then(response => {
      const { id, name, bio, email, whatsapp } = response.data

      setUser({
        id,
        name,
        bio,
        email,
        whatsapp
      })
    }).catch(error => console.log(`[PROFILE ERROR] > ${error}`))
  }, [userId])

  Modal.setAppElement('#root')
  const [isModalOpen, setModalOpen] = useState(false)
  const customModalStyles: ModalStyles = {
    content: {
      width: 'auto',
      maxWidth: '640px',
      margin: 'auto',

      border: 0,
      borderRadius: '1.6rem',

      overflow: 'hidden'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
  }

  function openModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <Container>
      <Modal
        isOpen={isModalOpen}
        style={customModalStyles}
      >
        <ModalContainer>
          <ModalTitle>
            Tem certeza que deseja desativar sua conta?
          </ModalTitle>

          <ModalAlert>
            Após desativar sua conta, você terá que
            criar uma nova, para cadastrar novas doações
            ou pontos de coleta.
          </ModalAlert>

          <ModalInfo>
            <RiInformationLine size={24} />
            Suas publicações continuarão disponíveis.
          </ModalInfo>

          <ModalButtons>
            <ButtonWithIcon
              className="danger-button"
              label="Sim, desejo desativar a conta"
              Icon={RiDeleteBinLine}
              onClick={() => handleDeactivateAccount(user.id)}
            />
            <ButtonWithIcon
              className="success-button"
              label="Cancelar"
              Icon={RiArrowGoForwardLine}
              onClick={closeModal}
            />
          </ModalButtons>
        </ModalContainer>
      </Modal>

      <Header>
        <UserProfileEditButtons>
          <ButtonWithIcon
            className="danger-button-outline"
            label="Desativar"
            Icon={RiDeleteBinLine}
            isOutline={true}
            onClick={openModal}
          />

          <ButtonWithIcon
            label="Editar"
            Icon={RiPencilLine}
            className="success-button"
            onClick={() => handleNavigateToUserUpdate(userId as string)}
          />
        </UserProfileEditButtons>
      </Header>

      <ProfileContainer>
        <UserPhoto>
          <Photo
            src={image}
            alt="Exército da Salvação"
          />
        </UserPhoto>

        <UserSubject>
          <UserName>{user.name}</UserName>
          <UserBio>
            {user.bio}
          </UserBio>
        </UserSubject>

        <UserContact>
          <ContactBox className="whatsapp-box">
            <ContactIcon>
              <RiWhatsappLine size={32} />
            </ContactIcon>

            <ContactText>
              <Text>{user.whatsapp}</Text>
            </ContactText>
          </ContactBox>

          <ContactBox className="email-box">
            <ContactIcon>
              <RiMailLine size={32} />
            </ContactIcon>

            <ContactText>
              <Text>{user.email}</Text>
            </ContactText>
          </ContactBox>
        </UserContact>
      </ProfileContainer>
    </Container>
  )
}

export default UserProfile

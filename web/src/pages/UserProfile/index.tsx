import React, { useState } from 'react'
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

const UserProfile: React.FC = () => {
  const history = useHistory()
  const userUuid = '123e4567-e89b-12d3-a456-426614174000'

  function handleNavigateToUserUpdate(uuid: string) {
    history.push(`/user/update/${uuid}`)
  }

  Modal.setAppElement('#root')
  const [isModalOpen, setModalOpen] = useState(false)
  const customModalStyles: ModalStyles = {
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
            onClick={() => handleNavigateToUserUpdate(userUuid)}
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
          <UserName>Exército da Salvação</UserName>
          <UserBio>
            Somos uma ONG que visa em ajudar o próximo
            e dar-lhe assim itens para auxiliar em sua vivência.
          </UserBio>
        </UserSubject>

        <UserContact>
          <ContactBox className="whatsapp-box">
            <ContactIcon>
              <RiWhatsappLine size={32} />
            </ContactIcon>

            <ContactText>
              <Text>47999999999</Text>
            </ContactText>
          </ContactBox>

          <ContactBox className="email-box">
            <ContactIcon>
              <RiMailLine size={32} />
            </ContactIcon>

            <ContactText>
              <Text>cristianprochnow@gmail.com</Text>
            </ContactText>
          </ContactBox>
        </UserContact>
      </ProfileContainer>
    </Container>
  )
}

export default UserProfile

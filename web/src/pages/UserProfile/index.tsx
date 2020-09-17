import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  RiWhatsappLine,
  RiPencilLine,
  RiDeleteBinLine, RiMailLine
} from 'react-icons/ri'

import './styles.css'

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
  UserSubject
} from './styles'

import image from '../../assets/images/image.jpg'

const UserProfile: React.FC = () => {
  const history = useHistory()
  const userUuid = '123e4567-e89b-12d3-a456-426614174000'.split('-').join('')

  function handleNavigateToUserUpdate(uuid: string) {
    history.push(`/user/update/${uuid}`)
  }

  return (
    <Container>
      <Header>
        <UserProfileEditButtons>
          <ButtonWithIcon
            label="Desativar"
            Icon={RiDeleteBinLine}
            isOutline={true}
            className="danger-button"
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

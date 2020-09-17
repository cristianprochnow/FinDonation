import React, { ChangeEvent, useState } from 'react'

import {
  Container,
  SignUpForm,
  InputGroup2x2,
  InputGroup3x2
} from './styles'

import Title from '../../components/Title'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Dropzone from '../../components/Dropzone'
import PasswordInput from '../../components/PasswordInput'
import Textarea from '../../components/Textarea'
import Fieldset from '../../components/Fieldset'
import Button from '../../components/Button'

const UserUpdate: React.FC = () => {
  const [userPersonalData, setUserPersonalData] = useState({
    name: 'Cristian',
    whatsapp: '47999999999',
    bio: 'Só vamo, carai!'
  })

  const [userLoginData, setUserLoginData] = useState({
    email: 'contato@cristian.com',
    password: 'BaconIsLife'
  })

  function handleSetUserPersonalData(
    event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setUserPersonalData({
      ...userPersonalData,
      [name]: value
    })
  }

  function handleSetUserLoginData(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setUserLoginData({
      ...userLoginData,
      [name]: value
    })

    console.table(userLoginData)
  }

  return (
    <Container>
      <Header />

      <SignUpForm>
        <Title>Atualizar informações do perfil</Title>

        <Dropzone
          onFileUpload={file => console.log(file)}
        />

        <Fieldset legend="Informações pessoais">
          <InputGroup3x2>
            <Input
              label="Como deseja ser chamado?"
              name="name"
              value={userPersonalData.name}
              onChange={handleSetUserPersonalData}
            />

            <Input
              type="number"
              min="0"
              label="Número de WhatsApp"
              name="whatsapp"
              value={userPersonalData.whatsapp}
              onChange={handleSetUserPersonalData}
            />
          </InputGroup3x2>

          <Textarea
            label="Uma breve descrição sobre você"
            name="bio"
            value={userPersonalData.bio}
            onChange={handleSetUserPersonalData}
          />
        </Fieldset>

        <Fieldset legend="Dados para Log In">
          <Input
            type="email"
            label="E-mail"
            name="email"
            example="usuario@dominio.com"
            value={userLoginData.email}
            onChange={handleSetUserLoginData}
          />

          <InputGroup2x2>
            <PasswordInput
              label="Senha"
              name="password"
              example="No mínimo 8 caracteres."
              min="8"
              value={userLoginData.password}
              onChange={handleSetUserLoginData}
            />

            <PasswordInput
              label="Confirme sua senha"
              name="retypedPassword"
              example="Redigite sua senha."
              min="8"
            />
          </InputGroup2x2>
        </Fieldset>

        <Button
          label="Enviar"
        />
      </SignUpForm>
    </Container>
  )
}

export default UserUpdate

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../../services/api'

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
  const history = useHistory()

  const [userPersonalData, setUserPersonalData] = useState({
    id: '',
    name: '',
    whatsapp: '',
    bio: '',
    avatar: ''
  })

  const [userLoginData, setUserLoginData] = useState({
    email: '',
    password: ''
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
  }

  function handleSubmitData(event: FormEvent) {
    event.preventDefault()

    const {id, name, bio, whatsapp, avatar} = userPersonalData
    const {email, password} = userLoginData

    const userData = {
      id,
      name,
      bio,
      whatsapp,
      email,
      password,
      avatar
    }

    api.post(`/users/update/${id}`, userData).then(response => {
      alert('🎈 Mudança concluída com sucesso.')

      history.goBack()
    }).catch(error => console.error(`[DEACTIVATE ACCOUNT] > ${error}`))
  }

  useEffect(() => {
    function loadStoragedData() {
      const storagedId = sessionStorage.getItem('FinDonation@user:id')

      return storagedId
    }

    const storagedId = loadStoragedData()

    api.get(`/users/profile/${storagedId}`)
      .then(response => {
        const {
          id,
          name,
          bio,
          email,
          whatsapp,
          avatar
        } = response.data

        setUserPersonalData({
          id,
          name,
          bio,
          whatsapp,
          avatar
        })

        setUserLoginData({
          email,
          password: ''
        })
      }).catch(error => {
        console.error(`[USER UPDATE] > ${error}`)
      })
  }, [])

  return (
    <Container>
      <Header />

      <SignUpForm onSubmit={event => handleSubmitData(event)}>
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

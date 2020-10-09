import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { api } from '../../services/api'

import { useAuth } from '../../contexts/auth'

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

  const { user } = useAuth()

  const [avatar, setAvatar] = useState<File|null>(null)

  const [userPersonalData, setUserPersonalData] = useState({
    name: '',
    whatsapp: '',
    bio: ''
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

    const {name, bio, whatsapp} = userPersonalData
    const {email, password} = userLoginData

    const formData = new FormData()

    formData.append('name', name)
    formData.append('bio', bio)
    formData.append('password', password)
    formData.append('email', email)
    formData.append('whatsapp', whatsapp)
    formData.append('avatar', avatar as Blob)

    api.put(`/users/update/${user?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': user?.token
      }
    }).then(response => {
      alert('🎈 Mudança concluída com sucesso.')

      history.goBack()
    }).catch(error => console.error(`[DEACTIVATE ACCOUNT] > ${error}`))
  }

  useEffect(() => {
    api.get(`/users/profile/${user?.id}`, {
      headers: {
        'token': user?.token
      }
    })
      .then(response => {
        const {
          name,
          bio,
          email,
          whatsapp
        } = response.data

        setUserPersonalData({
          name,
          bio,
          whatsapp
        })

        setUserLoginData({
          email,
          password: ''
        })
      }).catch(error => {
        console.error(`[USER UPDATE] > ${error}`)
      })
  }, [user])

  return (
    <Container>
      <Header />

      <SignUpForm onSubmit={event => handleSubmitData(event)}>
        <Title>Atualizar informações do perfil</Title>

        <Dropzone
          onFileUpload={file => setAvatar(file)}
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

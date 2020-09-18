import React, { ChangeEvent, FormEvent, useState } from 'react'
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

const UserSignUp: React.FC = () => {
  const history = useHistory()

  const [avatar, setAvatar] = useState('')

  const [personalData, setPersonalData] = useState({
    name: '',
    whatsapp: '',
    bio: ''
  })

  const [logInData, setLogInData] = useState({
    email: '',
    password: ''
  })

  function handleChangeUserPersonalData(
    event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setPersonalData({
      ...personalData,
      [name]: value
    })
  }

  function handleChangeUserLogInData(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setLogInData({
      ...logInData,
      [name]: value
    })
  }

  async function handleSubmitData(event: FormEvent) {
    event.preventDefault()

    const { name, bio, whatsapp } = personalData
    const { email, password } = logInData

    const userData = {
      name,
      bio,
      whatsapp,
      email,
      password,
      avatar
    }

    try {
      const userResponse = await api.post('/users/signup', userData)

      const { id } = userResponse.data

      sessionStorage.setItem('FinDonation@user:id', id)

      alert('🎉 Cadastro realizado com sucesso!')

      history.push('/donations')
    } catch (error) {
      console.error(`[USER SIGN UP] > ${error}`)
    }
  }

  return (
    <Container>
      <Header />

      <SignUpForm onSubmit={handleSubmitData}>
        <Title>Cadastro de usuário</Title>

        <Dropzone
          onFileUpload={({name}) => setAvatar(name)}
        />

        <Fieldset legend="Informações pessoais">
          <InputGroup3x2>
            <Input
              label="Como deseja ser chamado?"
              name="name"
              value={personalData.name}
              onChange={handleChangeUserPersonalData}
            />

            <Input
              type="number"
              min="0"
              label="Número de WhatsApp"
              name="whatsapp"
              value={personalData.whatsapp}
              onChange={handleChangeUserPersonalData}
            />
          </InputGroup3x2>

          <Textarea
            label="Uma breve descrição sobre você"
            name="bio"
            value={personalData.bio}
            onChange={handleChangeUserPersonalData}
          />
        </Fieldset>

        <Fieldset legend="Dados para Log In">
          <Input
            label="E-mail"
            name="email"
            example="usuario@dominio.com"
            value={logInData.email}
            onChange={handleChangeUserLogInData}
          />

          <InputGroup2x2>
            <PasswordInput
              label="Senha"
              name="password"
              example="No mínimo 8 caracteres."
              min="8"
              value={logInData.password}
              onChange={handleChangeUserLogInData}
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

export default UserSignUp

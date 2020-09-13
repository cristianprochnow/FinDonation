import React from 'react'

import {
  Container,
  SignUpForm,
  Fieldset,
  InputGroup3x2
} from './styles'

import Title from '../../components/Title'
import Header from '../../components/Header'
import Input from '../../components/Input'
import SubTitle from '../../components/SubTitle'
import Textarea from '../../components/Textarea'

const UserSignUp: React.FC = () => {
  return (
    <Container>
      <Header />

      <SignUpForm>
        <Title>Cadastro de usuário</Title>

        <Fieldset>
          <SubTitle>Informações particulares</SubTitle>

          <InputGroup3x2>
            <Input
              label="Nome"
              name="name"
            />

            <Input
              type="number"
              label="Número de WhatsApp"
              name="whatsapp"
            />
          </InputGroup3x2>

          <Textarea />
        </Fieldset>
      </SignUpForm>
    </Container>
  )
}

export default UserSignUp

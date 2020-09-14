import React from 'react'

import {
  Container,
  SignUpForm,
  InputGroup3x2
} from './styles'

import Title from '../../components/Title'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Fieldset from '../../components/Fieldset'

const UserSignUp: React.FC = () => {
  return (
    <Container>
      <Header />

      <SignUpForm>
        <Title>Cadastro de usuário</Title>

        <Fieldset legend="Informações pessoais">
          <InputGroup3x2>
            <Input
              label="Como deseja ser chamado?"
              name="name"
            />

            <Input
              type="number"
              min="0"
              label="Número de WhatsApp"
              name="whatsapp"
            />
          </InputGroup3x2>

          <Textarea
            label="Uma breve descrição sobre você"
            name="bio"
          />
        </Fieldset>
      </SignUpForm>
    </Container>
  )
}

export default UserSignUp

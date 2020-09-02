import React from 'react'

import {
  Container,
  HeroImage,
  Logo,
  SubContainer,
  TextBox,
  Title,
  Description,
  Button,
  SquareWithIcon,
  Label
} from './styles'

import { RiLoginBoxLine } from 'react-icons/ri'

import landingImg from '../../assets/images/landing.svg'
import logo from '../../assets/images/logos/findonation-with-label.svg'

const Home: React.FC = () => {
  return (
    <Container>
      <SubContainer>
        <Logo src={logo} />

        <TextBox>
          <Title>Encontre, comunique e doe.</Title>
          <Description>Doe e ajude ONGs. Tudo em um só lugar.</Description>
        </TextBox>

        <Button>
          <SquareWithIcon>
            <RiLoginBoxLine size={32} />
          </SquareWithIcon>

          <Label>Encontrar doações</Label>
        </Button>
      </SubContainer>

      <SubContainer>
        <HeroImage src={landingImg} />
      </SubContainer>
    </Container>
  )
}

export default Home

import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  Container,
  HeroImage,
  Logo,
  SubContainer,
  TextBox,
  Title,
  Description
} from './styles'
import ButtonWithSquareForIcon from '../../components/ButtonWithSquareForIcon'

import { RiLoginBoxLine } from 'react-icons/ri'

import landingImg from '../../assets/images/landing.svg'
import logo from '../../assets/images/logos/findonation-with-label.svg'

const Home: React.FC = () => {
  const history = useHistory()

  function handleNavigateToDonationsPage(): void {
    history.push('/donations')
  }

  return (
    <Container>
      <SubContainer>
        <Logo src={logo} />

        <TextBox>
          <Title>Encontre, comunique e doe.</Title>
          <Description>Doe e ajude ONGs. Tudo em um só lugar.</Description>
        </TextBox>

        <ButtonWithSquareForIcon
          label="Encontrar doações"
          Icon={RiLoginBoxLine}
          onClick={handleNavigateToDonationsPage}
        />
      </SubContainer>

      <SubContainer>
        <HeroImage src={landingImg} />
      </SubContainer>
    </Container>
  )
}

export default Home

import styled from 'styled-components'

import {
  Title as TitleComponent,
} from '../../components/Title/styles'
import {
  Description as DescriptionComponent
} from '../../components/Description/styles'

const Container = styled.main`
  width: 90vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;

  @media (max-width: 1100px) {
    & {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
  }
`

const SubContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  @media (max-width: 1100px) {
    & {
      align-items: center;
    }
  }
`

const TextBox = styled.div`
  width: 100%;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const HeroImage = styled.img`
  width: 90%;
  object-fit: contain;

  align-self: center;

  @media (max-width: 1100px) {
    display: none;
  }
`

const Logo = styled.img`
  width: 32rem;
  object-fit: contain;
`

const Title = styled(TitleComponent)`
  width: 72%;

  @media (max-width: 1100px) {
    & {
      width: 64%;

      text-align: center;
    }
  }
`

const Description = styled(DescriptionComponent)`
  width: 50%;

  margin-top: 1.6rem;

  @media (max-width: 1100px) {
    & {
      width: 70%;
      text-align: center;
    }
  }
`

export {
  Container,
  HeroImage,
  Logo,
  SubContainer,
  TextBox,
  Title,
  Description
}

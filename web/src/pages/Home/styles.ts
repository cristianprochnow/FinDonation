import styled from 'styled-components'

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

const Title = styled.h1`
  width: 50%;
  font: 700 4rem Comfortaa;
  line-height: 4.8rem;
  color: ${props => props.theme.text.title.base};

  @media (max-width: 1100px) {
    & {
      width: 60%;
      text-align: center;
    }
  }
`

const Description = styled.p`
  width: 50%;
  font: 400 1.6rem Montserrat;
  line-height: 3.2rem;
  margin-top: 1.6rem;

  @media (max-width: 1100px) {
    & {
      width: 70%;
      text-align: center;
    }
  }
`

const Button = styled.button`
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  border-radius: .8rem;
  color: ${props => props.theme.text.common.inButton};
  background: ${props => props.theme.colors.primary};
  transition: background ${props => props.theme.time.transitionButton};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`

const SquareWithIcon = styled.div`
  height: 100%;
  padding: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.black[200]};
`

const Label = styled.strong`
  font: 600 1.6rem Montserrat;
  padding: 0 3.2rem;
`

export {
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
}

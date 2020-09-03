import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 90vw;
  max-width: 1200px;
  min-height: 100vh;

  margin: auto;
`

export const Header = styled.header`
  width: 100%;

  padding: 1.6rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  font: 500 1.6rem Montserrat;
  text-decoration: none;

  color: ${props => props.theme.colors.primary};

  transition: color ${props => props.theme.time.transitionButton};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }

  & svg {
    margin-right: .4rem;
  }
`

export const Logo = styled.img`
  @media (max-width: 700px) {
    display: none;
  }

  height: 3.2rem;
  object-fit: contain;
`

export const ButtonWithIcon = styled.button`
  padding: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: .8rem;

  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.common.inButton};

  cursor: pointer;
  transition: background-color ${props => props.theme.time.transitionButton};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  & svg {
    margin-right: .8rem;
  }
`

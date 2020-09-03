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

export const Logo = styled.img`
  @media (max-width: 700px) {
    display: none;
  }

  height: 3.2rem;
  object-fit: contain;
`

import styled from 'styled-components'

export const Header = styled.header`
  width: 100%;

  padding: 1.6rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.img`
  height: 3.2rem;
  object-fit: contain;
`

export const ResponsiveLogo = styled(Logo)`
  @media (max-width: 700px) {
    display: none;
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  width: 90vw;
  max-width: 1200px;
  min-height: 100vh;

  margin: auto;
`

export const SearchContainer = styled.section`
  width: 100%;
  margin-top: .8rem;
  padding: 2.4rem;

  border: 0;
  border-radius: 1.6rem;

  background-color: ${props => props.theme.colors.inBackground};
`

export const SubContainer = styled.div`
  width: 100%;
`

export const CardContainer = styled.div`
  width: 100%;
  margin-top: 2.4rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: .8rem;
`

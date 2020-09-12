import styled from 'styled-components'

export const Container = styled.main`
  width: 90vw;
  max-width: 1200px;
  min-height: 100vh;

  margin: auto;
`

export const SearchContainer = styled.section`
  width: 100%;
  margin: .8rem 0;
  padding: 2.4rem;

  border: 0;
  border-radius: 1.6rem;

  background-color: var(--color-in-background);
`

export const SubContainer = styled.div`
  width: 100%;

  & + & {
    margin-top: 4rem;
  }
`

export const CardContainer = styled.div`
  width: 100%;
  margin-top: 2.4rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: .8rem;
`

export const SelectContainer = styled.div`
  width: 100%;
  margin-top: 1.6rem;
  gap: 1.6rem;

  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;

    align-items: flex-end;
  }
`

export const DonationsContainer = styled.article`
  width: 100%;
  margin: 2.4rem 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2.4rem;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: .8rem;
`

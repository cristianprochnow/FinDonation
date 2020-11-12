import styled from 'styled-components'

import { Description } from '../../components/Description/styles'
import { SubTitle } from '../../components/SubTitle/styles'

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

export const SelectContainer = styled.form`
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

export const ModalContainer = styled.section`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

export const ModalHeader = styled.header`
  width: 100%;
  text-align: center;
`

export const  ModalTitle = styled(SubTitle)`
  font: 700 2.4rem Comfortaa;

  color: var(--color-text-primary);
`

export const ModalDescription = styled(Description)`
  font-weight: 500;

  line-height: 4rem;
`

export const ModalForm = styled.form`
  width: 100%;
`

export const ModalSignUpQuestion = styled(Description)`
  width: 100%;
  margin-bottom: 1.6rem;
  text-align: center;
`

export const LogOutButton = styled.button`
  height: 5.6rem;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;

  font: 700 1.6rem Montserrat;

  color: var(--color-danger);

  cursor: pointer;
  transition: opacity var(--time-transition-button);

  &:hover {
    opacity: var(--opacity-800);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: var(--opacity-400);
  }

  & svg {
    margin-right: .8rem;
  }
`

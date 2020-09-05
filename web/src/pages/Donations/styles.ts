import styled from 'styled-components'

export const Container = styled.main`
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
`

export const SelectBlock = styled.div`
  width: 100%;
`

export const Label = styled.label`
  display: block;

  font: 700 1.6rem Montserrat;
  line-height: 2.4rem;

  color: ${props => props.theme.text.common.base};
`

export const Select = styled.select`
  width: 100%;
  height: 5.6rem;
  padding: 0 1.6rem;

  border: .4rem solid ${props => props.theme.colors.black[200]};
  border-radius: .8rem;
  background-color: ${props => props.theme.colors.inBackground};
  color: ${props => props.theme.text.common.base};

  cursor: pointer;
  transition: all ${props => props.theme.time.transitionButton};

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
  }
`

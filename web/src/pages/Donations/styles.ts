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

export const SubTitle = styled.h2`
  font: 700 3.2rem Comfortaa;
  line-height: 4.8rem;

  color: ${props => props.theme.text.title.base};
`

export const CardContainer = styled.div`
  width: 100%;
  margin-top: 1.6rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-gap: .8rem;
`

export const Card = styled.li`
  padding: .8rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: .4rem solid;
  border-color: ${props => props.theme.colors.black[200]};
  border-radius: .8rem;
  background-color: ${props => props.theme.card.background};

  list-style: none;
`

export const CardIcon = styled.img`
  height: 2.4rem;
  margin-right: .8rem;
`

export const CardLabel = styled.span`
  font: 500 1.6rem Montserrat;

  color: ${props => props.theme.text.common.primary};
`

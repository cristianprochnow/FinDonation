import styled from 'styled-components'

export const CategoryCard = styled.li`
  padding: .8rem 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: .4rem solid;
  border-color: var(--color-card-border);
  border-radius: .8rem;
  background-color: var(--color-card-background);

  cursor: pointer;
  list-style: none;
`

export const CardIcon = styled.img`
  height: 2.4rem;
  margin-right: .8rem;
`

export const CardLabel = styled.span`
  font: 500 1.6rem Montserrat;

  color: var(--color-text-in-card);
`

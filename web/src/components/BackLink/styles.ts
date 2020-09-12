import styled from 'styled-components'

export const BackLink = styled.button`
  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font: 500 1.6rem Montserrat;

  border: none;
  background: transparent;
  color: var(--color-text-primary);

  cursor: pointer;
  transition: opacity var(--time-transition-link);

  &:hover {
    opacity: var(--opacity-800);
  }

  & svg {
    margin-right: .4rem;
  }
`

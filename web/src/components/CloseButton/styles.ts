import styled from 'styled-components'

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  padding: .4rem;

  border: 0;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: var(--color-black-400);

  cursor: pointer;
  transition: color var(--time-transition-button);

  &:hover {
    color: var(--color-danger);
  }
`

import styled from 'styled-components'

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  padding: .8rem;

  border: 0;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  color: var(--color-danger);

  cursor: pointer;
  transition: all var(--time-transition-button);

  &:hover {
    background-color: var(--color-danger);
    color: var(--color-text-in-button);
  }
`

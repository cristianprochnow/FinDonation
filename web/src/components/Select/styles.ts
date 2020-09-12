import styled from 'styled-components'

export const SelectBlock = styled.div`
  width: 100%;
`

export const Label = styled.label`
  display: block;

  font: 700 1.6rem Montserrat;
  line-height: 2.4rem;

  color: var(--color-text-base);
`

export const Select = styled.select`
  width: 100%;
  height: 5.6rem;
  padding: 0 1.6rem;

  border: .4rem solid var(--color-black-200);
  border-radius: .8rem;
  background-color: var(--color-in-background);
  color: var(--color-text-base);

  cursor: pointer;
  transition: all var(--time-transition-input);

  &:hover {
    background-color: var(--color-background);
  }

  &:focus {
    border-color: var(--color-primary);
  }

  &:disabled {
    cursor: not-allowed;
  }
`

import styled from 'styled-components'

export const TextAreaBlock = styled.div`
  width: 100%;
  margin: 1.6rem 0 .8rem 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const Label = styled.label`
  display: block;

  font: 700 1.6rem Montserrat;
  line-height: 2.4rem;

  color: var(--color-text-base);
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 9.6rem;
  padding: 1.6rem;

  border: .4rem solid var(--color-black-200);
  border-radius: .8rem;
  background-color: var(--color-in-background);
  color: var(--color-text-base);

  resize: vertical;
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

export const Description = styled.strong`
  display: block;

  font: 500 1.2rem Montserrat;
  line-height: 1.8rem;
`

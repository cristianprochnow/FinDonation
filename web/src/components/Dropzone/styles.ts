import styled from 'styled-components'

export const Dropzone = styled.div`
  width: 100%;
  height: 24rem;
  margin: 3.2rem 0 2.4rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 4px solid var(--color-primary);
  border-radius: .8rem;
  background-color: var(--color-secondary-background);

  overflow: hidden;
`

export const DropzoneInput = styled.input``

export const DropzoneLabel = styled.p`
  width: calc(100% - 4.8rem);
  height: calc(100% - 4.8rem);
  padding: 0 1.6rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  border: 4px dashed var(--color-primary);
  border-radius: .8rem;
  font: 600 1.6rem Montserrat;
  color: var(--color-text-primary);
`

export const DropzoneImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

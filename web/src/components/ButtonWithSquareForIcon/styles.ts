import styled from 'styled-components'

export const ButtonWithSquareForIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: .8rem;

  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.common.inButton};

  overflow: hidden;
  cursor: pointer;
  transition: opacity ${props => props.theme.time.transitionButton};

  &:hover {
    opacity: ${props => props.theme.colors.opacity[800]};
  }
`

export const IconBox = styled.div`
  height: 100%;

  padding: 0 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.theme.colors.black[200]};
`

export const LabelBox = styled.div`
  padding: 2.4rem;
`

export const Label = styled.strong`
  font: 700 1.6rem Montserrat;
`

import styled from 'styled-components'

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

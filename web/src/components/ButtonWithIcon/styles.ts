import styled from 'styled-components'

export const ButtonWithIcon = styled.button`
  padding: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: .8rem;

  font: 700 1.6rem Montserrat;

  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.text.common.inButton};

  cursor: pointer;
  transition: background-color ${props => props.theme.time.transitionButton};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  & svg {
    margin-right: .8rem;
  }
`

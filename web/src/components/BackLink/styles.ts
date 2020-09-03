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
  color: ${props => props.theme.colors.primary};

  cursor: pointer;
  transition: color ${props => props.theme.time.transitionButton};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }

  & svg {
    margin-right: .4rem;
  }
`

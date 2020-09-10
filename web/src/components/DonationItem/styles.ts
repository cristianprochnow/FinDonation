import styled from 'styled-components'

import { Title } from '../Title/styles'
import { Description } from '../Description/styles'

export const Donation = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;

  border: 0;
  border-radius: 1.6rem;
  background-color: ${props => props.theme.colors.inBackground};

  overflow: hidden;
`

export const DonationHeader = styled.header`
  width: 100%;

  border: 0;
  border-radius: 0 0 1.6rem 1.6rem;
  background-color: ${props => props.theme.colors.secondary};
`

export const TextBox = styled.div`
  width: 100%;
  padding: 0 1.6rem .8rem 1.6rem;
`

export const DonationTitle = styled(Title)`
  font-size: 2.4rem;

  color: ${props => props.theme.text.title.inPrimary};
`

export const DonationDescription = styled(Description)`
  font-size: 1.2rem;
  line-height: 2.4rem;

  padding-bottom: .8rem;

  color: ${props => props.theme.text.common.inPrimary};
`

export const ImageBox = styled.div`
  width: 100%;
  height: 16rem;

  overflow: hidden;
`

export const DonationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const DonationFooter = styled.footer`
  width: 100%;
  padding: 1.6rem;

  display: flex;
  flex-direction: column;
`

export const ButtonsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 1.6rem;
`

export const BottomLine = styled.div`
  width: 100%;
  margin-top: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ONGIdentifier = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => props.theme.colors.secondary};
`

export const ForwardLink = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-content: center;

  border: 0;
  background-color: transparent;
  color: ${props => props.theme.text.title.primary};

  cursor: pointer;
  transition: color ${props => props.theme.time.transitionButton};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }

  & svg {
    margin-left: .4rem;
  }
`

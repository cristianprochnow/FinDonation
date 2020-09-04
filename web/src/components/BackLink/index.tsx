import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'
import { useHistory } from 'react-router-dom'

import { BackLink as BackLinkComponent } from './styles'

import { RiArrowLeftLine } from 'react-icons/ri'

interface BackLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  Icon?: IconType
}

const BackLink: React.FC<BackLinkProps> = ({
  label = 'Voltar',
  Icon = RiArrowLeftLine,
  ...rest
}) => {
  const history = useHistory()

  function handleNavigateBack(): void {
    history.goBack()
  }

  return (
    <BackLinkComponent
      onClick={handleNavigateBack}
      {...rest}
    >
      <Icon size={24} />
      {label}
    </BackLinkComponent>
  )
}

export default BackLink

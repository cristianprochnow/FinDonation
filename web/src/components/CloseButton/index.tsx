import React, { ButtonHTMLAttributes } from 'react'

import { RiCloseCircleLine } from 'react-icons/ri'

import {
  CloseButton as CloseButtonComponent
} from './styles'

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  iconSize = 32,
  ...rest
}) => {
  return (
    <CloseButtonComponent
      onClick={onClick}
      {...rest}
    >
      <RiCloseCircleLine size={iconSize} />
    </CloseButtonComponent>
  )
}

export default CloseButton

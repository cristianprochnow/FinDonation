import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons/lib'

import { LinkWithIcon as LinkWithIconComponent } from './styles'

interface LinkWithIconsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  Icon: IconType
  iconSize?: number
}

const LinkWithIcon: React.FC<LinkWithIconsProps> = ({
  label,
  Icon,
  iconSize = 24,
  onClick,
  ...rest
}) => {
  return (
    <LinkWithIconComponent
      onClick={onClick}
      {...rest}
    >
      <Icon size={iconSize} />
      {label}
    </LinkWithIconComponent>
  )
}

export default LinkWithIcon

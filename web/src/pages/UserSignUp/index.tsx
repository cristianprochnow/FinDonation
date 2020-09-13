import React from 'react'
import { useParams } from 'react-router-dom'

import {} from './styles'

interface RouteParams {
  type: string
}

const UserSignUp = ({ }) => {
  const { type } = useParams<RouteParams>()

  return (
    <h1>{type}</h1>
  )
}

export default UserSignUp

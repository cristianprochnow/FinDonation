import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextProps {
  signed: boolean
}

interface LogInResponseProps {
  id: string
  token: string
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
  useEffect(() => {
  }, [])

  async function logIn() {
  }

  return (
    <AuthContext.Provider value={{ signed: true }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const authContext = useContext(AuthContext)

  return authContext
}

export default AuthProvider

export { useAuth }

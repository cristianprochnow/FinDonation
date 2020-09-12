import React, { createContext } from 'react'

interface AuthContextProps {
  signed: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={{ signed: false }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export {
  AuthContext
}

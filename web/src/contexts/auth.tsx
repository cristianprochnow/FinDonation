import React, { createContext, useContext } from 'react'

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

function useAuth() {
  const authContext = useContext(AuthContext)

  return authContext
}

export default AuthProvider

export { useAuth }

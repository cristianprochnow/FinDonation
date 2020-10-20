import { AxiosResponse } from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface UserProps {
  id: string
  token: string
}

interface AuthContextProps {
  signed: boolean
  user: UserProps|null
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps|null>(null)

  useEffect(() => {
    const userTokenFromLocalStorage = localStorage.getItem('FinDonation@user:token')
    const userIdFromLocalStorage = localStorage.getItem('FinDonation@user:id')

    if (userTokenFromLocalStorage && userIdFromLocalStorage) {
      setUser({
        id: userIdFromLocalStorage,
        token: userTokenFromLocalStorage
      })
    } else {
      localStorage.clear()
    }
  }, [])

  async function logIn(email: string, password: string): Promise<void> {
    interface LogInResponseProps {
      id: string
      token: string
    }

    try {
      const userLogInResponse: AxiosResponse<LogInResponseProps> = await api.post(
        '/users/login',
        {
          email,
          password
        })

      const { id, token } = userLogInResponse.data

      setUser({ id, token })

      localStorage.setItem('FinDonation@user:id', id)
      localStorage.setItem('FinDonation@user:token', token)
    } catch (error) {
      throw new Error()
    }
  }

  function logOut(): void {
    setUser(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn, logOut }}>
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

import { AxiosResponse } from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface UserProps {
  id: string
}

interface AuthContextProps {
  signed: boolean
  user: UserProps|null
  logIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProps|null>(null)

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(
      localStorage.getItem('FinDonation@user') as string
    )
    const tokenFromLocalStorage = localStorage.getItem('FinDonation@token')

    if (userDataFromLocalStorage && tokenFromLocalStorage) {
      api.defaults.headers.token = tokenFromLocalStorage
      setUser(userDataFromLocalStorage)
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

      api.defaults.headers.token = token

      setUser({ id })

      localStorage.setItem('FinDonation@user', JSON.stringify({ id }))
      localStorage.setItem('FinDonation@token', token)
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, logIn }}>
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

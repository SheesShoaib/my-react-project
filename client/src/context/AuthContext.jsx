import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from '../services/authService'

const AuthContext =
  createContext(null)

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null)

  const [token, setToken] =
    useState(
      localStorage.getItem(
        'luxurystay_token'
      ) ||
        sessionStorage.getItem(
          'luxurystay_token'
        ) ||
        null
    )

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data =
          await getCurrentUser(token)

        setUser(
          data.user || data
        )
      } catch (error) {
        console.error(
          'Auth verification:',
          error
        )

        localStorage.removeItem(
          'luxurystay_token'
        )

        sessionStorage.removeItem(
          'luxurystay_token'
        )

        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [token])

  const login = async (
    credentials,
    remember = false
  ) => {
    const data =
      await loginUser(credentials)

    const receivedToken =
      data.token

    const receivedUser =
      data.user

    if (
      !receivedToken ||
      !receivedUser
    ) {
      throw new Error(
        'Invalid login response from server.'
      )
    }

    localStorage.removeItem(
      'luxurystay_token'
    )

    sessionStorage.removeItem(
      'luxurystay_token'
    )

    if (remember) {
      localStorage.setItem(
        'luxurystay_token',
        receivedToken
      )
    } else {
      sessionStorage.setItem(
        'luxurystay_token',
        receivedToken
      )
    }

    setToken(receivedToken)
    setUser(receivedUser)

    return data
  }

  const register = async (
    userData
  ) => {
    return await registerUser(
      userData
    )
  }

  const logout = () => {
    localStorage.removeItem(
      'luxurystay_token'
    )

    sessionStorage.removeItem(
      'luxurystay_token'
    )

    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated:
      Boolean(user && token),
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.'
    )
  }

  return context
}
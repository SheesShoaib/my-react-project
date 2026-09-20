import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  getCurrentUser,
} from '../services/authService'


const AuthContext =
  createContext(null)


export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null)

  const [token, setToken] =
    useState(null)

  const [authLoading, setAuthLoading] =
    useState(true)


  useEffect(() => {

    const initializeAuth =
      async () => {

        const savedToken =
          localStorage.getItem(
            'luxuryStayToken'
          ) ||
          sessionStorage.getItem(
            'luxuryStayToken'
          )


        if (!savedToken) {
          setAuthLoading(false)
          return
        }


        try {

          const data =
            await getCurrentUser(
              savedToken
            )

          setToken(savedToken)
          setUser(data.user)

        } catch (error) {

          localStorage.removeItem(
            'luxuryStayToken'
          )

          localStorage.removeItem(
            'luxuryStayUser'
          )

          sessionStorage.removeItem(
            'luxuryStayToken'
          )

          sessionStorage.removeItem(
            'luxuryStayUser'
          )

          setToken(null)
          setUser(null)

        } finally {

          setAuthLoading(false)

        }
      }


    initializeAuth()

  }, [])


  const login = (
    userData,
    authToken,
    remember = false
  ) => {

    // Remove previous auth storage
    localStorage.removeItem(
      'luxuryStayToken'
    )

    localStorage.removeItem(
      'luxuryStayUser'
    )

    sessionStorage.removeItem(
      'luxuryStayToken'
    )

    sessionStorage.removeItem(
      'luxuryStayUser'
    )


    const storage =
      remember
        ? localStorage
        : sessionStorage


    storage.setItem(
      'luxuryStayToken',
      authToken
    )

    storage.setItem(
      'luxuryStayUser',
      JSON.stringify(userData)
    )


    setToken(authToken)
    setUser(userData)
  }


  const logout = () => {

    localStorage.removeItem(
      'luxuryStayToken'
    )

    localStorage.removeItem(
      'luxuryStayUser'
    )

    sessionStorage.removeItem(
      'luxuryStayToken'
    )

    sessionStorage.removeItem(
      'luxuryStayUser'
    )

    setToken(null)
    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authLoading,
        isAuthenticated: Boolean(
          user && token
        ),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  return useContext(AuthContext)
}
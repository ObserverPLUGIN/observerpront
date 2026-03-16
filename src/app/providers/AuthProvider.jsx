import { createContext, useState } from 'react'
import {
  clearSessionToken,
  readSessionToken,
  writeSessionToken,
} from '../../features/auth/store/authSessionStore'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readSessionToken())
  const [notice, setNotice] = useState('')

  function login(nextToken) {
    writeSessionToken(nextToken)
    setToken(nextToken)
    setNotice('')
  }

  function logout(message = '') {
    clearSessionToken()
    setToken('')
    setNotice(message)
  }

  function clearNotice() {
    setNotice('')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        notice,
        isAuthenticated: Boolean(token),
        login,
        logout,
        clearNotice,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

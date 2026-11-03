import { useMemo, useState } from 'react'
import { AuthContext } from './authContext'

const STORAGE_KEY = 'ard_user'

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  const value = useMemo(
    () => ({
      user,
      login(selectedUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedUser))
        setUser(selectedUser)
      },
      logout() {
        localStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

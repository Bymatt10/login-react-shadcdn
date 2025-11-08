import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, AuthContextType, LoginCredentials } from '@/types/auth'
import { tokenStorage } from '@/lib/token'
import { authService } from '@/services/authService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      if (tokenStorage.isAccessTokenValid()) {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      } else {
        tokenStorage.clearTokens()
      }
    } catch (error) {
      console.error('Error loading user:', error)
      tokenStorage.clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      tokenStorage.setTokens(response.accessToken, response.refreshToken)
      
      const { accessToken, refreshToken, ...userData } = response
      setUser(userData)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }

  const logout = useCallback(() => {
    tokenStorage.clearTokens()
    setUser(null)
  }, [])

  const getAccessToken = useCallback(() => {
    return tokenStorage.getAccessToken()
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    getAccessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}


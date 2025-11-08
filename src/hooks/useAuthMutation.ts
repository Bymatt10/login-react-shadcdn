import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { LoginCredentials } from '@/types/auth'

export const useLoginMutation = () => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onError: (error) => {
      console.error('Error en login:', error)
    },
  })
}


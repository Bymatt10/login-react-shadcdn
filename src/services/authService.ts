import { apiClient } from '@/lib/api'
import { AuthResponse, LoginCredentials, User } from '@/types/auth'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials)
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me', true)
  },

  async refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return apiClient.post('/auth/refresh', { refreshToken })
  },
}


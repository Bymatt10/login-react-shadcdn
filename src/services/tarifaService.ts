import { apiClient } from '@/lib/api'
import { TarifasResponse } from '@/types/tarifa'

export const tarifaService = {
  async getTarifas(params?: { limit?: number; skip?: number }): Promise<TarifasResponse> {
    const queryParams = new URLSearchParams()
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.skip) queryParams.append('skip', params.skip.toString())
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : ''
    return apiClient.get<TarifasResponse>(`/products${query}`, false)
  },
}


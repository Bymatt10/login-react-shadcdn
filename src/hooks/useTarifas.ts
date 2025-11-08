import { useQuery } from '@tanstack/react-query'
import { tarifaService } from '@/services/tarifaService'

interface UseTarifasParams {
  limit?: number
  skip?: number
  enabled?: boolean
}

export const useTarifas = ({ limit = 30, skip = 0, enabled = true }: UseTarifasParams = {}) => {
  return useQuery({
    queryKey: ['tarifas', { limit, skip }],
    queryFn: () => tarifaService.getTarifas({ limit, skip }),
    enabled,
    staleTime: 5 * 60 * 1000,
  })
}


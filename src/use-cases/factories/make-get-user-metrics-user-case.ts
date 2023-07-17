import { GetUserMetricUseCase } from '../get-user-metrics'
import { PrismaCheckInsRespository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetrics() {
  const checkInRepository = new PrismaCheckInsRespository()
  const useCase = new GetUserMetricUseCase(checkInRepository)
  return useCase
}

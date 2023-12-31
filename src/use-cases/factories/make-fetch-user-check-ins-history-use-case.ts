import { FetchUserCheckInsHistoryUseCase } from '../fetch-members-check-ins-history'
import { PrismaCheckInsRespository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRespository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  return useCase
}

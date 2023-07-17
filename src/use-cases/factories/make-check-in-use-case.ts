import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRespository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRespository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymRepository)
  return useCase
}

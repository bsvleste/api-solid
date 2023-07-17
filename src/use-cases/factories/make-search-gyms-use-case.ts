import { SearchGymsUseCaseUseCase } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gyms = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCaseUseCase(gyms)
  return useCase
}

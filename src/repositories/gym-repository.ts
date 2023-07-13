import { Gym, Prisma } from '@prisma/client'
export interface FindManyNearbyParam {
  latitude: number
  longitude: number
}

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParam): Promise<Gym[]>
}

import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
let gymsInMemoryRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase
describe('Fetch nearbys gyms Use Case', () => {
  beforeEach(async () => {
    gymsInMemoryRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsInMemoryRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsInMemoryRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.58820583111925),
      longitude: new Decimal(-46.53947750005597),
    })
    await gymsInMemoryRepository.create({
      title: 'far Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.56776115725773),
      longitude: new Decimal(-46.70769248234932),
    })
    const { gyms } = await sut.execute({
      userLatitude: -23.57299645978125,
      userLongitude: -46.54343073370562,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

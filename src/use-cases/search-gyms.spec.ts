import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCaseUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
let gymsInMemoryRepository: InMemoryGymsRepository
let sut: SearchGymsUseCaseUseCase
describe('Seacr gyms Use Case', () => {
  beforeEach(async () => {
    gymsInMemoryRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCaseUseCase(gymsInMemoryRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsInMemoryRepository.create({
      title: 'Javascript',
      description: null,
      phone: null,
      latitude: -23.581741735994314,
      longitude: -46.5686835107891,
    })
    await gymsInMemoryRepository.create({
      title: 'Typescript',
      description: null,
      phone: null,
      latitude: -23.581741735994314,
      longitude: -46.5686835107891,
    })
    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript' })])
  })
  it('should be able to fetch paginated gyms searchs ', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsInMemoryRepository.create({
        title: `Javascript Gym-${i}`,
        description: null,
        phone: null,
        latitude: -23.581741735994314,
        longitude: -46.5686835107891,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym-21' }),
      expect.objectContaining({ title: 'Javascript Gym-22' }),
    ])
  })
})

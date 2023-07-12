import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
let gymRepositoryInMemory: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymRepositoryInMemory = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepositoryInMemory)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.581741735994314,
      longitude: -46.5686835107891,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

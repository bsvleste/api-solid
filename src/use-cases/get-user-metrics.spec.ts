import { InMemoryCheckInRepository } from './../repositories/in-memory/in-memory-check-in-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { GetUserMetricUseCase } from './get-user-metrics'
let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: GetUserMetricUseCase

describe('Get User check ins metrics use Case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new GetUserMetricUseCase(checkInRepositoryInMemory)
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to get check ins count from metrics', async () => {
    await checkInRepositoryInMemory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepositoryInMemory.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })
    expect(checkInsCount).toEqual(2)
  })
})

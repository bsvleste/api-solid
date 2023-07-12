import { InMemoryCheckInRepository } from './../repositories/in-memory/in-memory-check-in-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-members-check-ins-history'
let checkInRepositoryInMemory: InMemoryCheckInRepository

let sut: FetchUserCheckInsHistoryUseCase
describe('Fetch history check ins in use Case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInRepositoryInMemory)
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to fetch history user check in', async () => {
    await checkInRepositoryInMemory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepositoryInMemory.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })
  it('should be able to fetch paginated user history check in', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepositoryInMemory.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})

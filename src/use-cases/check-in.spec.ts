import { InMemoryCheckInRepository } from './../repositories/in-memory/in-memory-check-in-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check in use Case', () => {
  beforeEach(() => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepositoryInMemory)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-02',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in differen  days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})

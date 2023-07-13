import { InMemoryCheckInRepository } from './../repositories/in-memory/in-memory-check-in-repository'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
let checkInRepositoryInMemory: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase
describe('Validate Check in use Case', () => {
  beforeEach(async () => {
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepositoryInMemory)
    vi.useFakeTimers()
  })
  afterEach(() => {
    // vi.useRealTimers()
  })
  it('should be able to validate check in', async () => {
    const createdCheckIn = await checkInRepositoryInMemory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepositoryInMemory.items[0].validated_at).toEqual(
      expect.any(Date),
    )
  })
  it('should not be able to validate an existent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'nonexistent-checking',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await checkInRepositoryInMemory.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)
    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

import { InMemoryCheckInRepository } from './../repositories/in-memory/in-memory-check-in-repository'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'
let checkInRepositoryInMemory: InMemoryCheckInRepository
let gymsRespositoryInMemory: InMemoryGymsRepository
let sut: CheckInUseCase
describe('Check in use Case', () => {
  beforeEach(async () => {
    gymsRespositoryInMemory = new InMemoryGymsRepository()
    checkInRepositoryInMemory = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepositoryInMemory, gymsRespositoryInMemory)

    await gymsRespositoryInMemory.create({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-02',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in differen  days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-02',
      userId: 'user-02',
      userLatitude: 0,
      userLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRespositoryInMemory.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-23.581741735994314),
      longitude: new Decimal(-46.5686835107891),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-02',
        userLatitude: -23.58811975162969,
        userLongitude: -46.539326172914336,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

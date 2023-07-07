import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepositoryInMemory: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('Get user Profile Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepositoryInMemory)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepositoryInMemory.create({
      name: 'bruno de souza',
      email: 'brunoccsp@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('bruno de souza')
  })
  it('should not be able to get profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrongId',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepositoryInMemory: InMemoryUserRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(usersRepositoryInMemory)
  })
  it('should be able to authenticate', async () => {
    await usersRepositoryInMemory.create({
      name: 'bruno de souza',
      email: 'brunoccsp@gmail.com',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'brunoccsp@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await usersRepositoryInMemory.create({
      name: 'bruno de souza',
      email: 'brunoccsp@gmail.com',
      password_hash: await hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'brunocc@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await usersRepositoryInMemory.create({
      name: 'bruno de souza',
      email: 'brunoccsp@gmail.com',
      password_hash: await hash('123456', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'brunoccsp@gmail.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

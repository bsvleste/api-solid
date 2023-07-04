import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepositoryInMemory = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jon@jondoe@gmai.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const usersRepositoryInMemory = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'jon@jondoe@gmai.com',
      password: '123456',
    })
    const isPasswordCorrectlyHased = await compare(
      '123456',
      user?.password_hash,
    )
    expect(isPasswordCorrectlyHased).toBe(true)
  })
  it('should not be able to register with same email twice', async () => {
    const usersRepositoryInMemory = new InMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepositoryInMemory)
    const email = 'bvaleiro@gmail.com'
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

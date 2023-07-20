import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to autenticate', async () => {
    await request(app.server).post('/sessions').send({
      name: 'jon doe',
      email: 'jonhdoe@example.com',
      password: 'aeioub',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'jonhdoe@example.com',
      password: 'aeioub',
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

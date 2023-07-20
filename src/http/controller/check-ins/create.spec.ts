import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Cehck-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -23.588679426964674,
        longitude: -46.5398459502393,
      },
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.588679426964674,
        longitude: -46.5398459502393,
      })

    expect(response.statusCode).toEqual(201)
  })
})

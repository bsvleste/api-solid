import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate a check in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -23.588679426964674,
        longitude: -46.5398459502393,
      },
    })
    let checkIns = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkIns.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
    checkIns = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIns.id,
      },
    })
    expect(checkIns.validated_at).toEqual(expect.any(Date))
  })
})

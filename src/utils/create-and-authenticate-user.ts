import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAmdin = false,
) {
  await prisma.user.create({
    data: {
      name: 'jon doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      role: isAmdin ? 'ADMIN' : 'MEMBER',
    },
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jonhdoe@example.com',
    password: '123456',
  })
  const { token } = authResponse.body
  return { token }
}

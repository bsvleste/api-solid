import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './http/controller/user/routes'
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkInsRoute } from './http/controller/check-ins/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(userRoutes)
app.register(gymsRoutes)
app.register(checkInsRoute)
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation.error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo here we should log to an exteral tool like datadog/sentry
  }
  return reply.status(500).send({ message: 'internal server error' })
})

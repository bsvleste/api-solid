import fastify from 'fastify'
import { appRoutes } from './http/Routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)
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

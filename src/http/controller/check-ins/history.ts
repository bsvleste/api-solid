import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = fetchUserCheckInHistorySchema.parse(request.query)

  const fetchUserCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchUserCheckInsUseCase.execute({
    page,
    userId: request.user.sub,
  })
  return reply.status(200).send({
    checkIns,
  })
}

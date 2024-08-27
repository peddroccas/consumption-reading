import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class ConfirmController {
  static async confirmMeasure(request: FastifyRequest, reply: FastifyReply) {
    try {
      const confirmMeasureBodySchema = z.object({
        measure_uuid: z.string().uuid(),
        confirmed_value: z.number(),
      })

      const { confirmed_value, measure_uuid } = confirmMeasureBodySchema.parse(
        request.body,
      )
      const measureExists = await prisma.measure.findUnique({
        where: { id: measure_uuid },
      })

      if (!measureExists) {
        const error = {
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Leitura do mês já realizada',
        }
        throw error
      }

      await prisma.measure.update({
        where: { id: measure_uuid },
        data: {
          confirmed: true,
          value: confirmed_value,
        },
      })
    } catch (error) {
      reply.status(404).send(error)
    }
  }
}

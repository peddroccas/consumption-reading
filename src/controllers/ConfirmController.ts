import { prisma } from '@/lib/prisma'
import { ConfirmationDuplicatedError, MeasureNotFoundError } from '@/types'
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
      const measure = await prisma.measure.findUnique({
        where: { id: measure_uuid },
        select: { confirmed: true },
      })

      if (!measure) {
        throw new MeasureNotFoundError()
      }

      if (measure?.confirmed) {
        throw new ConfirmationDuplicatedError()
      }

      await prisma.measure.update({
        where: { id: measure_uuid },
        data: {
          confirmed: true,
          value: confirmed_value,
        },
      })

      reply.status(200).send({ success: true })
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.status(400).send({
          error_code: 'INVALID_DATA',
          erro_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }

      if (error instanceof MeasureNotFoundError) {
        reply.status(404).send(error)
      }

      if (error instanceof ConfirmationDuplicatedError) {
        reply.status(409).send(error)
      }

      reply.status(500).send(error)
    }
  }
}

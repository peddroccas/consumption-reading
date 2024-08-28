import { prisma } from '@/lib/prisma'
import { MeasuresNotFoundError } from '@/types'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class UserController {
  static async listAllMeasures(request: FastifyRequest, reply: FastifyReply) {
    try {
      const listParamsSchema = z.object({
        customer_code: z.string().uuid(),
      })
      const listQuerySchema = z.object({
        measure_type: z.enum(['WATER', 'GAS']).optional(),
      })

      const { measure_type } = listQuerySchema.parse(request.query)
      const { customer_code } = listParamsSchema.parse(request.params)

      const allMeasuresList = await prisma.measure.findMany({
        where: {
          user_id: customer_code,
        },
        select: {
          id: true,
          date: true,
          type: true,
          confirmed: true,
          url: true,
        },
      })

      let measureList = allMeasuresList

      if (measure_type) {
        measureList = allMeasuresList.filter(
          (measure) => measure.type === measure_type,
        )
      }

      if (measureList.length === 0) {
        throw new MeasuresNotFoundError()
      }

      reply.status(200).send({
        customer_code,
        measures: measureList,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (error.errors[0].path.includes('measure_type'))
          reply.status(400).send({
            error_code: 'INVALID_DATA',
            erro_description:
              'Os dados fornecidos no corpo da requisição são inválidos',
          })
      }
      if (error instanceof MeasuresNotFoundError) {
        reply.status(404).send(error)
      }
      reply.status(500).send(error)
    }
  }
}

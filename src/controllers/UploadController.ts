import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { googleAIFileManager, model } from '@/app'
import path from 'path'
import { writeFile, unlink } from 'node:fs/promises'
import { DoubleReportError } from '@/types'

export class UploadController {
  static async uploadMeasure(request: FastifyRequest, reply: FastifyReply) {
    try {
      const uploadBodySchema = z.object({
        image: z.string().base64(),
        customer_code: z.string().uuid(),
        measure_datetime: z.coerce.date(),
        measure_type: z.enum(['WATER', 'GAS']),
      })

      const { image, customer_code, measure_datetime, measure_type } =
        uploadBodySchema.parse(request.body)

      const measuresByUser = await prisma.measure.findMany({
        where: {
          user_id: customer_code,
        },
        select: { date: true, type: true },
      })

      const alreadyHasReadingForMonth = measuresByUser?.find((measure) => {
        return (
          measure.type === measure_type &&
          measure.date.getMonth() === measure_datetime.getMonth() &&
          measure.date.getFullYear() === measure_datetime.getFullYear()
        )
      })

      if (alreadyHasReadingForMonth) {
        throw new DoubleReportError()
      }

      const imgBuffer = Buffer.from(image, 'base64')
      const tempFilePath = path.join(__dirname, 'tempfile')

      // Salve o buffer no arquivo temporário
      await writeFile(tempFilePath, imgBuffer)

      const uploadResponse = await googleAIFileManager.uploadFile(
        tempFilePath,
        {
          mimeType: 'image/jpeg',
        },
      )

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        {
          text: 'Collect the value of clock in the given image, give only the float number, no extras text',
        },
      ])

      const newMeasure = await prisma.measure.create({
        data: {
          value: Number(result.response.text()),
          type: measure_type,
          date: measure_datetime,
          url: `data:image/jpeg;base64,${image}`,
          user_id: customer_code,
        },
      })

      await unlink(tempFilePath)

      reply.status(200).send({
        measure_value: newMeasure.value,
        measure_uuid: newMeasure.id,
        image_url: `data:image/jpeg;base64,${image}`,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.status(400).send({
          error_code: 'INVALID_DATA',
          erro_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }
      if (error instanceof DoubleReportError) {
        reply.status(409).send(error)
      }

      reply.status(500).send(error)
    }
  }
}

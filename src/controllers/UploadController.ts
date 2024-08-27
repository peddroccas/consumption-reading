import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { googleAIFileManager, model } from '@/app'

export class UploadController {
  static async uploadBill(request: FastifyRequest, reply: FastifyReply) {
    try {
      const uploadBodySchema = z.object({
        image: z.string().base64(),
        customer_code: z.string(),
        measure_datetime: z.date(),
        measure_type: z.enum(['WATER', 'GAS']),
      })

      const { image, customer_code, measure_datetime, measure_type } =
        uploadBodySchema.parse(request.params)

      const uploadResponse = await googleAIFileManager.uploadFile(image, {
        mimeType: 'image/base64',
      })

      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: 'Collect the value of bill amount' },
      ])

      console.log(result.response.text)
      reply.status(200).send()
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao consultar sala pelo número' })
    }
  }
}

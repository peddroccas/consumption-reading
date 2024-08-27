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

      switch (measure_type) {
        case 'WATER':
        case 'GAS':
      }

      const alreadyHasReadingForMonth = async () => {
        switch (measure_type) {
          case 'WATER':
            return await prisma.waterBill.findMany({
              where: {
                user_id: customer_code,
                date: measure_datetime,
              },
            })
          case 'GAS':
            return await prisma.gasBill.findMany({
              where: {
                user_id: customer_code,
                date: measure_datetime,
              },
            })
        }
      }

      if ((await alreadyHasReadingForMonth()).length) {
        throw new Error('Já existe uma leitura para este tipo no mês atual')
      }

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

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { googleAIFileManager, model } from '@/app'
import path from 'path'
import { writeFile, unlink } from 'node:fs/promises'

export class UploadController {
  static async uploadBill(request: FastifyRequest, reply: FastifyReply) {
    try {
      const uploadBodySchema = z.object({
        image: z.string().base64(),
        customer_code: z.string().uuid(),
        measure_datetime: z.coerce.date(),
        measure_type: z.enum(['WATER', 'GAS']),
      })

      const { image, customer_code, measure_datetime, measure_type } =
        uploadBodySchema.parse(request.body)

      const bills =
        measure_type === 'WATER'
          ? await prisma.user
              .findFirst({
                where: {
                  id: customer_code,
                },
                select: { waterBills: true },
              })
              .then((bills) => bills?.waterBills)
          : await prisma.user
              .findFirst({
                where: {
                  id: customer_code,
                },
                select: { gasBills: true },
              })
              .then((bills) => bills?.gasBills)

      const alreadyHasReadingForMonth = bills?.find((bill) => {
        return bill.date.getMonth() === measure_datetime.getMonth()
      })

      if (alreadyHasReadingForMonth) {
        const error = {
          error_code: 'DOUBLE_REPORT',
          error_description: 'Leitura do mês já realizada',
        }
        throw error
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
          text: 'Collect the value of clock in the given image, give only the answer, no extras text',
        },
      ])

      const newBill =
        measure_type === 'WATER'
          ? await prisma.waterBill.create({
              data: {
                value: Number(result.response.text()),
                date: measure_datetime,
                user_id: customer_code,
              },
            })
          : await prisma.gasBill.create({
              data: {
                value: Number(result.response.text()),
                date: measure_datetime,
                user_id: customer_code,
              },
            })

      await unlink(tempFilePath)

      reply.status(200).send({
        image_url: `data:image/jpeg;base64,${image}`,
        measure_value: newBill.value,
        measure_uuid: newBill.id,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply.status(400).send({
          error,
          error_code: 'INVALID_DATA',
          erro_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }
      reply.status(500).send(error)
    }
  }
}

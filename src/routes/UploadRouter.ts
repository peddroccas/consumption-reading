import { UploadController } from '@/controllers/UploadController'
import { FastifyInstance } from 'fastify'

export async function UploadRoutes(app: FastifyInstance) {
  app.post('/payments/:catechizingName', UploadController.uploadBill)
}

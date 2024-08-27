import { UploadController } from '@/controllers/UploadController'
import { FastifyInstance } from 'fastify'

export async function UploadRoutes(app: FastifyInstance) {
  app.post('/upload', UploadController.uploadMeasure)
}

import { FastifyInstance } from 'fastify'
import { UploadController } from './controllers/UploadController'
import { ConfirmController } from './controllers/ConfirmController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/upload', UploadController.uploadMeasure)
  app.patch('/confirm', ConfirmController.confirmMeasure)
}

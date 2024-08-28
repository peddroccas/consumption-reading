import { FastifyInstance } from 'fastify'
import { UploadController } from './controllers/UploadController'
import { ConfirmController } from './controllers/ConfirmController'
import { UserController } from './controllers/UserController'

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', UserController.addNewUser)
  app.post('/upload', UploadController.uploadMeasure)
  app.patch('/confirm', ConfirmController.confirmMeasure)
  app.get('/:customer_code/list', UserController.listAllMeasures)
}

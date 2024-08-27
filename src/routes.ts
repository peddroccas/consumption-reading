import { FastifyInstance } from 'fastify'
import { UploadRoutes } from './routes/UploadRouter'

export async function appRoutes(app: FastifyInstance) {
  app.register(UploadRoutes)
}

import { FastifyInstance } from 'fastify'
import { UploadRoutes } from './routes/uploadRouter'

export async function appRoutes(app: FastifyInstance) {
  app.register(UploadRoutes)
}

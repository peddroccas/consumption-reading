import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(() => console.log('123'))
}

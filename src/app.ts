import fastify from 'fastify'
import { appRoutes } from './routes'
import { GoogleAIFileManager } from '@google/generative-ai/server'
import { env } from './env'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const app = fastify()
export const googleAIFileManager = new GoogleAIFileManager(env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
})

app.register(appRoutes)

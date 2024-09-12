import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekGoals } from '../../services/get-week-goals'

export const getWeekGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/week-goals', async () => getWeekGoals())
}

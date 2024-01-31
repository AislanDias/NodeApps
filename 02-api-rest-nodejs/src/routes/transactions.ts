import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// WARNING!!! All plugins on fastify must be asynchronous

export async function transactionsRoutes(app: FastifyInstance) {
  // This handler is global only for this context
  // All context changes will only happen on this context, it will not interefe with other contexts
  // app.addHook('preHandler', async (request, reply) => {
  //     console.log(`[${request.method}] ${request.url}`)
  // })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const sessionId = request.cookies.sessionId

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // It will validate if it's an uuid
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)
      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      // If we don't put first at the end, knex will always return an array
      // const summary = await knex('transactions').sum('amount')

      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', {
          as: 'amount',
        })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    // { title, amount, type: credit  or debt }
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debt']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    // if the sessionId isn't found we'll create a new one and save it
    if (!sessionId) {
      sessionId = randomUUID()

      // In path parameter we can restrict where this cookie will be available
      // We can use expires or maxage (cookie expiration)
      // Clean Code Practice
      reply.cookie('sessionId', sessionId, {
        path: '/',
        // expires : new Date('2023-12-01T08:00:00')
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // We shouldn't return our register (.returning('*'))
    // Knex isn't able to auto-suggest new fields if we delete the fields here
    // ORMs are able to do this without any new setup
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}

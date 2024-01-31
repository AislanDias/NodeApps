import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// WARNING!!! All plugins on fastify must be asynchronous

export async function transactionsRoutes(app : FastifyInstance ){
    
    app.get('/', async () => {
        const transactions = await knex('transactions').select()

        return { transactions }
    })

    app.get('/:id', async (request) => {
        // It will validate if it's an uuid
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const transaction = await knex('transactions').where('id', id).first()

        return { transaction }
    })

    app.get('/summary', async () => {
        // If we don't put first at the end, knex will always return an array
        // const summary = await knex('transactions').sum('amount')
        const summary = await knex('transactions').sum('amount', {
            as : 'amount'
        }).first()

        return { summary }
    })
    
    app.post('/', async ( request, reply ) => {
        // { title, amount, type: credit  or debt }
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debt']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(
            request.body
        )

        let sessionId = request.cookies.sessionId

        // if the sessionId isn't found we'll create a new one and save it
        if( !sessionId ){
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
        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount : type === 'credit' ? amount : amount * -1,
            })
        
        return reply.status(201).send()
    })
}
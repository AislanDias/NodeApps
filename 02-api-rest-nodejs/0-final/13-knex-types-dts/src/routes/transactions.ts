import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// WARNING!!! All plugins on fastify must be asynchronous

export async function transactionsRoutes(app : FastifyInstance ){
    
    
    app.post('/', async ( request, reply ) => {
        // { title, amount, type: credit or debt }
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debt']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(
            request.body
        )

        // We shouldn't return our register .returning('*')
        // Knex isn't able to auto-suggest new fields if we delete the fields here
        // ORMs are able to do this without any new setup
        await knex('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount : type === 'credit' ? amount : amount * -1,
            })

        // Query Builders / ORM

        
        return reply.status(201).send()
    })
}
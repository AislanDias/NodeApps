import { FastifyInstance } from 'fastify'
import { knex } from '../database'

// WARNING!!! All plugins on fastify must be asynchronous

export async function transactionsRoutes(app : FastifyInstance ){
    app.get('/hello', async () => {
    const tables = await knex('transactions')
        .where('amount', 1000)
        .select('*')

    return tables
    })
}
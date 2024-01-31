import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

// The order we define plugins is the order it will run
app.register(cookie)


// This handler is global only for this context
// All context changes will happen globally, on all routes
// app.addHook('preHandler', async (request, reply) => {
//     console.log(`[${request.method}] ${request.url}`)
// })

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

// It will return id 1, knex doesn't return all values by default
app.get('/first', async () => {
  const tables = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transacao de teste',
    amount: 1000,
  })

  return tables
})

app.get('/all', async () => {
  const tables = await knex('transactions').select('*')

  return tables
})

app.get('/hello', async () => {
  const tables = await knex('transactions').where('amount', 1000).select('*')

  return tables
})

// GET, POST, PUT, PATH, DELETE

// http://localhost:3333/hello

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })

// Convert from JS to TS
// npx tsc src/server.ts

// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node

import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'

const app = fastify()

// It will return id 1, knex doesn't return all values by default
app.get('/first', async () => {
  const tables = await knex('transactions').insert({
    id : crypto.randomUUID(),
    title: 'Transacao de teste',
    amount: 1000,
  })

  return tables
})

app.get('/all', async () => {
  const tables = await knex('transactions').select('*')

  return tables
})

app.get('/select-amount', async () => {
  const tables = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return tables
})

// GET, POST, PUT, PATH, DELETE

// http://localhost:3333/hello

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })

// Convert from JS to TS
// npx tsc src/server.ts

// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node

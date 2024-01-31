// THIS IS A COPY OF SERVER.TS ONLY FOR TESTS

import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

// The order we define plugins is the order it will run
app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

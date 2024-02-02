"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_1 = require("./database");
const node_crypto_1 = __importDefault(require("node:crypto"));
const env_1 = require("./env");
const transactions_1 = require("./routes/transactions");
const cookie_1 = __importDefault(require("@fastify/cookie"));
const app = (0, fastify_1.default)();
// The order we define plugins is the order it will run
app.register(cookie_1.default);
app.register(transactions_1.transactionsRoutes, {
    prefix: 'transactions'
});
// It will return id 1, knex doesn't return all values by default
app.get('/first', async () => {
    const tables = await (0, database_1.knex)('transactions').insert({
        id: node_crypto_1.default.randomUUID(),
        title: 'Transacao de teste',
        amount: 1000,
    });
    return tables;
});
app.get('/all', async () => {
    const tables = await (0, database_1.knex)('transactions').select('*');
    return tables;
});
app.get('/hello', async () => {
    const tables = await (0, database_1.knex)('transactions')
        .where('amount', 1000)
        .select('*');
    return tables;
});
// GET, POST, PUT, PATH, DELETE
// http://localhost:3333/hello
app
    .listen({
    port: env_1.env.PORT,
})
    .then(() => {
    console.log('HTTP Server Running');
});
// Convert from JS to TS
// npx tsc src/server.ts
// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const database_1 = require("../database");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
// WARNING!!! All plugins on fastify must be asynchronous
async function transactionsRoutes(app) {
    app.get('/', async () => {
        const transactions = await (0, database_1.knex)('transactions').select();
        return { transactions };
    });
    app.get('/:id', async (request) => {
        // It will validate if it's an uuid
        const getTransactionParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getTransactionParamsSchema.parse(request.params);
        const transaction = await (0, database_1.knex)('transactions').where('id', id).first();
        return { transaction };
    });
    app.get('/summary', async () => {
        // If we don't put first at the end, knex will always return an array
        // const summary = await knex('transactions').sum('amount')
        const summary = await (0, database_1.knex)('transactions').sum('amount', {
            as: 'amount'
        }).first();
        return { summary };
    });
    app.post('/', async (request, reply) => {
        // { title, amount, type: credit  or debt }
        const createTransactionBodySchema = zod_1.z.object({
            title: zod_1.z.string(),
            amount: zod_1.z.number(),
            type: zod_1.z.enum(['credit', 'debt']),
        });
        const { title, amount, type } = createTransactionBodySchema.parse(request.body);
        // We shouldn't return our register .returning('*')
        // Knex isn't able to auto-suggest new fields if we delete the fields here
        // ORMs are able to do this without any new setup
        await (0, database_1.knex)('transactions')
            .insert({
            id: (0, crypto_1.randomUUID)(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        });
        // Query Builders / ORM
        return reply.status(201).send();
    });
}
exports.transactionsRoutes = transactionsRoutes;

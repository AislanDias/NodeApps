"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const database_1 = require("../database");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
// WARNING!!! All plugins on fastify must be asynchronous
async function transactionsRoutes(app) {
    app.post('/', async (request, reply) => {
        // { title, amount, type: credit or debt }
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

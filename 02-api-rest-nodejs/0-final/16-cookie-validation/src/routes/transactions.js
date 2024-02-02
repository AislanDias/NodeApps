"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const database_1 = require("../database");
const zod_1 = require("zod");
const crypto_1 = require("crypto");
const check_session_id_exists_1 = require("../middlewares/check-session-id-exists");
// WARNING!!! All plugins on fastify must be asynchronous
async function transactionsRoutes(app) {
    app.get('/', {
        preHandler: [check_session_id_exists_1.checkSessionIdExists],
    }, async (request) => {
        const sessionId = request.cookies.sessionId;
        const transactions = await (0, database_1.knex)('transactions')
            .where('session_id', sessionId)
            .select();
        return { transactions };
    });
    app.get('/:id', {
        preHandler: [check_session_id_exists_1.checkSessionIdExists],
    }, async (request) => {
        // It will validate if it's an uuid
        const getTransactionParamsSchema = zod_1.z.object({
            id: zod_1.z.string().uuid(),
        });
        const { id } = getTransactionParamsSchema.parse(request.params);
        const { sessionId } = request.cookies;
        const transaction = await (0, database_1.knex)('transactions')
            .where({
            id,
            session_id: sessionId,
        })
            .first();
        return { transaction };
    });
    app.get('/summary', {
        preHandler: [check_session_id_exists_1.checkSessionIdExists],
    }, async (request) => {
        // If we don't put first at the end, knex will always return an array
        // const summary = await knex('transactions').sum('amount')
        const { sessionId } = request.cookies;
        const summary = await (0, database_1.knex)('transactions')
            .where('session_id', sessionId)
            .sum('amount', {
            as: 'amount',
        })
            .first();
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
        let sessionId = request.cookies.sessionId;
        // if the sessionId isn't found we'll create a new one and save it
        if (!sessionId) {
            sessionId = (0, crypto_1.randomUUID)();
            // In path parameter we can restrict where this cookie will be available
            // We can use expires or maxage (cookie expiration)
            // Clean Code Practice
            reply.cookie('sessionId', sessionId, {
                path: '/',
                // expires : new Date('2023-12-01T08:00:00')
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });
        }
        // We shouldn't return our register (.returning('*'))
        // Knex isn't able to auto-suggest new fields if we delete the fields here
        // ORMs are able to do this without any new setup
        await (0, database_1.knex)('transactions').insert({
            id: (0, crypto_1.randomUUID)(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId,
        });
        return reply.status(201).send();
    });
}
exports.transactionsRoutes = transactionsRoutes;

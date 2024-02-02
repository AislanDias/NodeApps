"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRoutes = void 0;
const database_1 = require("../database");
// WARNING!!! All plugins on fastify must be asynchronous
async function transactionsRoutes(app) {
    app.get('/hello', async () => {
        const tables = await (0, database_1.knex)('transactions')
            .where('amount', 1000)
            .select('*');
        return tables;
    });
}
exports.transactionsRoutes = transactionsRoutes;

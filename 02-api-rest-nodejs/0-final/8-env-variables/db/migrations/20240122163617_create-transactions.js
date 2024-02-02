"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
// Used to create tables, delete tables ...
async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}
exports.up = up;
// Used when something goes wrong (Rollback)
async function down(knex) {
    await knex.schema.dropTable('transactions');
}
exports.down = down;
// Runs latest migration
// npm run knex -- migrate:latest

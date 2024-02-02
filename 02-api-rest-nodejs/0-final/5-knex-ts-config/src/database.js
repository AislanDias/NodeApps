"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const knex_1 = require("knex");
// Specify the format to config constant to have autocomplete features
exports.config = {
    client: 'sqlite3',
    connection: {
        filename: './db/app.db',
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
};
exports.knex = (0, knex_1.knex)(exports.config);

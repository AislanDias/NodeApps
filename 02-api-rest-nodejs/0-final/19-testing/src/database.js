"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
require("dotenv/config");
const knex_1 = require("knex");
const env_1 = require("./env");
// Specify the format to config constant to have autocomplete features
exports.config = {
    client: 'sqlite3',
    connection: {
        filename: env_1.env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
};
exports.knex = (0, knex_1.knex)(exports.config);

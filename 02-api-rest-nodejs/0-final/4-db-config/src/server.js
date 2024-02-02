"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_1 = require("./database");
const app = (0, fastify_1.default)();
app.get('/hello', () => {
    const tables = (0, database_1.knex)('sqlite_schema').select('*');
    return tables;
});
// GET, POST, PUT, PATH, DELETE
// http://localhost:3333/hello
app
    .listen({
    port: 3333,
})
    .then(() => {
    console.log('HTTP Server Running');
});
// Convert from JS to TS
// npx tsc src/server.ts
// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node

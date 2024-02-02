"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
app.get('/hello', () => {
    return 'Hello World';
});
// GET, POST, PUT, PATH, DELETE
// http://localhost:3333/hello
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running');
});
// Convert from JS to TS
// npx tsc src/server.ts
// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node

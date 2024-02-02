"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
// After importing the app here, it will try to upload the server on the port 3333
// To solve this issue of running the app on the same port or uploading it, install supertest
// With supertest we can make calls without putting the application on live
// We will need to make some changes on the project structure to fix that
const app_1 = require("../src/app");
// This function will run once before all the tests
// This is necessary so tests will run only when all plugins are ready to receive calls
(0, vitest_1.beforeAll)(async () => {
    await app_1.app.ready();
});
(0, vitest_1.afterAll)(async () => {
    await app_1.app.close();
});
// A test is composed by three components:
// - Statement: What the test intends to do
// - Operation: What the test will do
// - Validation: We did the call, was the behavious expected?, is the output valid?
(0, vitest_1.test)('User can create a new transaction', async () => {
    // We are creating here with app.server a raw NodeJS server
    await (0, supertest_1.default)(app_1.app.server)
        .post('/transactions')
        .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
    })
        .expect(201);
});

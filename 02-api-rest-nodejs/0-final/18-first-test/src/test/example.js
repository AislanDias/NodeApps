"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const vitest_1 = require("vitest");
// A test is composed by three components:
// - Statement: What the test intends to do
// - Operation: What the test will do
// - Validation: We did the call, was the behavious expected?, is the output valid?
(0, vitest_1.test)('User can create a new transaction', () => {
    const responseStatusCode = 201;
    (0, chai_1.expect)(responseStatusCode).equal(201);
});

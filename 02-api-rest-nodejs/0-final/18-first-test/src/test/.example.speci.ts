import { expect } from 'chai'
import { test } from 'vitest'

// A test is composed by three components:
// - Statement: What the test intends to do
// - Operation: What the test will do
// - Validation: We did the call, was the behavious expected?, is the output valid?

test('User can create a new transaction', () => {
  const responseStatusCode = 201

  expect(responseStatusCode).equal(201)
})

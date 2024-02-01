import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
// After importing the app here, it will try to upload the server on the port 3333
// To solve this issue of running the app on the same port or uploading it, install supertest
// With supertest we can make calls without putting the application on live
// We will need to make some changes on the project structure to fix that
import { app } from '../src/app'

// This function will run once before all the tests
// This is necessary so tests will run only when all plugins are ready to receive calls
beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})
// A test is composed by three components:
// - Statement: What the test intends to do
// - Operation: What the test will do
// - Validation: We did the call, was the behavious expected?, is the output valid?

test('User can create a new transaction', async () => {
  // We are creating here with app.server a raw NodeJS server
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})

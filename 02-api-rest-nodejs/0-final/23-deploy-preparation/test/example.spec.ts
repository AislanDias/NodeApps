import { expect, it, beforeAll, afterAll, beforeEach, describe } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
// After importing the app here, it will try to upload the server on the port 3333
// To solve this issue of running the app on the same port or uploading it, install supertest
// With supertest we can make calls without putting the application on live
// We will need to make some changes on the project structure to fix that
import { app } from '../src/app'

// Describe is used here as a way to label tests
describe('Transaction routes', () => {
  // This function will run once before all the tests
  // This is necessary so tests will run only when all plugins are ready to receive calls
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // The best scenario is always having a zero-rounded environment, including the database
  // It is a best practice to run migrations beforeEach instead of beforeAll
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  // e2e -> amigo -> poucos e bons

  // A test is composed by three components:
  // - Statement: What the test intends to do
  // - Operation: What the test will do
  // - Validation: We did the call, was the behavious expected?, is the output valid?

  // describe('subcategory', () => {})

  // We can use it or test
  it('should be able to create a new transaction', async () => {
    // We are creating here with app.server a raw NodeJS server
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    // console.log(response.headers)
    // console.log(response.get('Set-Cookie'))
  })

  // REMEMBER: ALL TESTS MUST EXCEPT THEMSELVES FROM ALL THE CONTEXT
  // A TEST SHOULDN'T DEPEND FROM OTHER TEST

  // To list all transactions we need a session_id
  // it.skip -> skips a test
  // it.todo -> remember to do a test in the future
  // it.only -> skips all the other tests and run it only
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    // console.log(listTransactionsResponse.body)

    // expect(listTransactionsResponse.body).toEqual([
    expect(listTransactionsResponse.body.transactions).toEqual([
      // {
      //   id: expect.any(String), //When the return is unpredictable we can use any(String)
      // }
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  // THE TEST SHOULD BE ADAPTED TO THE CODE, NOT OTHERWISE
  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    console.log('Cookie', cookies)

    const summaryResponse = await request(app.server)
      .get('/transactions/summary ')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})

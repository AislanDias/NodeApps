import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

// Because we can't use NEST features here, we will need to install dotenv
const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  // Overwriting my current database url with the new generated one
  process.env.DATABASE_URL = databaseURL

  // execSync runs the commands in the terminal
  // deploy only runs the migrations
  // dev reads the schema, generates new migrations
  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  // Drop test database schema automatically
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  // Disconnect database
  await prisma.$disconnect()
})

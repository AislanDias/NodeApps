import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'

// print all env config
// console.log(process.env)

if( !process.env.DATABASE_URL ){
  throw new Error('DATABASE_URL env not found.')
}

// Specify the format to config constant to have autocomplete features
export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)

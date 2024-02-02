"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
// z is used to create an schema ( data formats )
// We will create an unique schema for all environment variables
// We will use this schema to validate our env
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z.number().default(3333)
});
// NODE_ENV is a variable to show us the environment we're running in
// parse -> It tries to parse, if it fails it throws an error 
// export const env = envSchema.parse(process.env)
// safeParse -> It won't thrown an error so you'll be able to create your
// own error messages
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables!', _env.error.format());
    throw new Error('Invalid environment variables.');
}
exports.env = _env.data;

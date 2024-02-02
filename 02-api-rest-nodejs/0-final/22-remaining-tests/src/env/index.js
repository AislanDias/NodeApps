"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// process.env.NODE_ENV is filled automatically by vitest
// if you aren't using vitest you'll need to specify it
if (process.env.NODE_ENV === 'test') {
    dotenv_1.default.config({ path: '.env.test' });
}
else {
    console.log('entrei aqui');
}
// z is used to create an schema ( data formats )
// We will create an unique schema for all environment variables
// We will use this schema to validate our env
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z.number().default(3333),
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

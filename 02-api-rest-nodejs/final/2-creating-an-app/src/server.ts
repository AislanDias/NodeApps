import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
    return 'Hello World'
})

// GET, POST, PUT, PATH, DELETE

// http://localhost:3333/hello

app.listen({
    port : 3333,
}).then( () => {
    console.log('HTTP Server Running')
})

// Convert from JS to TS
// npx tsc src/server.ts

// This conversion will give you a lot of errors
// because NodeJS wasn't built for TS, so add:
// npm install -D @types/node
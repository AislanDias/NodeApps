import { app } from './app'
import { env } from './env'

app
  .listen({
    // This host can solve some problems when integrating with front end
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })

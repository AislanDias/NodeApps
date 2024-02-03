import { app } from "./app"

app.listen({
    // This host can solve some problems when integrating with front end
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    console.log('HTTP Server Running')
})
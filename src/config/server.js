import env from "./env.js"
import app from "../app.js"
import './dbConnection.js'

app.listen(env.backendPort , () => {
    console.log(`backend is running on PORT ${env.backendPort}`)
})
import express from "express"
import env from "./env.js"
import './dbConnection.js'

const app = express()

app.listen(env.backendPort , () => {
    console.log(`backend is running on PORT ${env.backendPort}`)
})
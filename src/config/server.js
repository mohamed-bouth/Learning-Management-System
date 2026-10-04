import env from "./env.js"
import app from "../app.js"
import './dbConnection.js'
import listners from "../utils/listnerHandler.js"



app.listen(env.backendPort, env.backendHost, () => {
    console.log(`backend is running on HOST ${env.backendHost} and PORT ${env.backendPort}`)
    console.log('---------------------------------')
    console.log(`Listner Available:`)
    console.log('---------------------------------')
    listners.forEach(litsner => {
        console.log(`${litsner.name} : ${litsner.adress}:${env.backendPort}`)
    })
    console.log('---------------------------------')
    
})
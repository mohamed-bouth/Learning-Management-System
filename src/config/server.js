import env from "./env.js"
import app from "../app.js"
import './dbConnection.js'
import os from "os"

const interfaces = os.networkInterfaces();

const listners = []

if (env.backendHost === "0.0.0.0") {

    for (const name in interfaces) {
        for (const network of interfaces[name]) {
            if (network.family === "IPv4") {
            
                listners.push({
                    name : network.internal ? "LocalHost" : "Network",
                    adress : network.address
                })
            }
        }
    }

}else if(env.backendHost === '127.0.0.1'){
    listners.push({
        name : 'Localhost',
        adress : env.backendHost
    })
}

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
import mongoose from "mongoose";
import env from "./env.js";

try {

    await mongoose.connect(env.mongoUri)

    console.log('Database Connected !')

}catch (error) {

    console.error(`Error on Database Connection :  ${error}`)

}
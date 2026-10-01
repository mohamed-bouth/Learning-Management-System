import 'dotenv/config'

const vars = process.env

const env = {
    mongoUri : vars.MONGO_URI,
    backendPort : vars.BACK_END_PORT
}

export default env
import jwt from "jsonwebtoken"
import env from "../config/env.js"

async function authenticate(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error("Authentication required")
        error.name = "AuthenticationError"
        error.status = 401
        return next(error)
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, env.jwtSecret)
        req.user = payload
        next()
    }catch(error){
        error.status = 401
        error.name = "AuthenticationError"
        error.message = "Invalid or expired token"
        return next(error)
    }
}

export default authenticate
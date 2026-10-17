import jwt from "jsonwebtoken"
import env from "../config/env.js"
import User from "../features/users/user.module.js"

async function authenticate(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error("Authentication required")
        error.name = "AuthenticationError"
        error.status = 401
        return next(error)
    }

    const token = authHeader.split(' ')[1]

    let payload

    try {
        payload = jwt.verify(token, env.jwtSecret)
        req.user = payload
    }catch(error){
        error.status = 401
        error.name = "AuthenticationError"
        error.message = "Invalid or expired token!"
        return next(error)
    }

    const user = await User.findById(payload.userId)

    if(!user || user.status === "suspended"){
        const error = new Error(!user ? "User not found" : "Your Account is Suspended, Contact Support!")
        error.status = !user ? 404 : 401
        error.name = "AuthenticationError"
        return next(error) 
    }

    next()

    
}

export default authenticate
import generateToken from '../../utils/generateJwt.js'
import { hashPassword, verifyPassword, removePasswordHashFromUserObj } from '../../utils/password.service.js'
import User from '../users/users.module.js'

export async function registerService(body) {

    const { name, email, password, passwordConfirmation } = body

    if (password !== passwordConfirmation) {
        const error = new Error('Password and Password confirmation must be the same !')
        error.name = 'ValidationError'
        throw error
    }

    const isEmailExist = await User.findOne({ email })

    if (isEmailExist) {
        const error = new Error('Email is already exist !')
        error.name = 'ValidationError'
        throw error
    }

    const passwordHash = await hashPassword(password)

    let user = await User.create({
        name,
        email,
        passwordHash,
        status: "active"
    })

    user = removePasswordHashFromUserObj(user)

    const JwtToken = generateToken({ userId: user._id })

    return {
        user,
        token: JwtToken
    }
}

export async function loginService(body) {
    const {email , password} = body

    let user = await User.findOne({email}).select("+passwordHash")

    if(!user || !( await verifyPassword(user.passwordHash, password))){
        const error = new Error('Invalid email or password. Please try again!')
        error.name = 'ValidationError'
        throw error
    }

    const JwtToken = generateToken({ userId: user._id })

    user = removePasswordHashFromUserObj(user)

    return {
        user,
        token: JwtToken
    }
}
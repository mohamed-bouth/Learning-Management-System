import 'dotenv/config'

const vars = process.env

const env = {
    mongoUri : vars.MONGO_URI,
    backendPort : vars.BACK_END_PORT,
    backendHost : vars.BACK_END_HOST,
    jwtSecret: vars.JWT_SECRET,
    jwtExpiresIn: vars.JWT_EXPIRES_IN,
    refreshTokenExpiresIn: vars.REFRESH_TOKEN_EXPIRES_IN,
    r2AccountId: vars.R2_ACCOUNT_ID,
    r2AccessKeyId: vars.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: vars.R2_SECRET_ACCESS_KEY,
    r2BucketName: vars.R2_BUCKET_NAME,
    r2Endpoint: vars.R2_ENDPOINT
}

export default env
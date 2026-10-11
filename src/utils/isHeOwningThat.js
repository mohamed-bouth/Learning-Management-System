async function isHeOwningThat(userId, thingId, Model, UserIdOnModel = "userId"){

    const thing = await Model.findById(thingId)

    if(!thing){
        const error =  new Error(`${Model.modelName} not Found !`)
        error.status = 404
        return {
            success: false,
            error
        }
    }

    if(!thing[UserIdOnModel] || thing[UserIdOnModel].toString() !== userId.toString()){
        const error =  new Error(`Access prohibited !`)
        error.name = "AuthorizationError"
        error.status = 403
        return {
            success: false,
            error
        }
    }

    return {
        success: true
    }
}

export default isHeOwningThat
import Enrollment from "../features/enrollments/enrollment.module.js"
import isHeOwningThat from "./isHeOwningThat.js";

async function isHeEnrolletOn(userId , courseId){
    const existingEnrollment = await Enrollment.findOne({learner: userId, course: courseId});

    if(existingEnrollment){
        return true
    }

    return false
}

async function hasAccess(ownership, scope , courseId = false){

    let hasAccess = false

    if(courseId){
        if(await isHeEnrolletOn(ownership.userId, ownership.courseId)){
            hasAccess = true
        }
    }

    const result = await isHeOwningThat(ownership.userId, ownership.thingId, ownership.Model, ownership.field)

    if(result.success){
        hasAccess = true
    }

    if(scope === "all"){
        hasAccess = true
    }

    if(!hasAccess){
        const error = new Error("you dont have access to this Course!")
        error.status = 403
        throw error
    }
}

export { hasAccess, isHeEnrolletOn }
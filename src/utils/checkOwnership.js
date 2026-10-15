import Enrollment from "../features/enrollments/enrollment.module.js"
import isHeOwningThat from "./isHeOwningThat.js";

async function isHeEnrolletOn(userId , courseId){
    const existingEnrollment = await Enrollment.findOne({
        learner: userId,
        course: courseId,
        status: { $in: ["active", "completed"] },
    });

    if(existingEnrollment){
        return true
    }

    return false
}

async function hasAccess(ownership, scope , courseId = false){

    let hasAccess = scope === "all"

    if(!hasAccess && courseId && scope === "published"){
        if(await isHeEnrolletOn(ownership.userId, courseId)){
            hasAccess = true
        }
    }

    if(!hasAccess){
        const result = await isHeOwningThat(ownership.userId, ownership.thingId, ownership.Model, ownership.field)

        if(result.success){
            hasAccess = true
        }
    }

    if(!hasAccess){
        const error = new Error("you dont have access to this Course!")
        error.status = 403
        throw error
    }
}

export { hasAccess, isHeEnrolletOn }
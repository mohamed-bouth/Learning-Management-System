import Resource from "../features/resources/resource.module.js";
import Enrollment from "../features/enrollments/enrollment.module.js"
import Module from "../features/modules/module.module.js";
import Progress from "../features/progressions/progress.module.js"
import { notFoundError } from "./accessControl.js";
import { authorizationError } from "./accessControl.js";

async function isHaveAccessToThatModule(resourceId, userId) {

    const resource = await Resource.findById(resourceId).populate({path: "module", populate: {path: "course"}})

    if(!resource?.module || !resource?.module.course){
        throw notFoundError()
    }

    const module = resource.module
    const course = resource.module.course;

    if (module.order === 1) {
        return { success: true };
    }

    const enrollment = await Enrollment.findOne({
        learner: userId,
        course: course._id,
    })

    if (!enrollment) {
        throw authorizationError();
    }

    const previousModule = await Module.findOne({
        course: module.course,
        order: module.order - 1,
    });

    if (!previousModule) {
        throw authorizationError();
    }

    const numberOfResources = await Resource.countDocuments({
        module: previousModule._id,
    });

    const numberOfCompletedProgress = await Progress.countDocuments({
        enrollment: enrollment._id,
        module: previousModule._id,
        status: "completed",
    });

    if ( numberOfResources === 0 || numberOfCompletedProgress !== numberOfResources){
        throw authorizationError();
    }

    return { success: true };
}

async function isHaveAccessToThatResource(resourceId, userId) {

    const resource = await Resource.findById(resourceId).populate({path: "module", populate: {path: "course"}})


    if (!resource?.module || !resource?.module.course) {
        throw authorizationError();
    }

    const module = resource.module
    const course = resource.module.course;

    const enrollment = await Enrollment.findOne({
        learner: userId,
        course: course._id,
    })

    if (!enrollment) {
        throw authorizationError();
    }

    const existingProgress = await Progress.findOne({
        enrollment: enrollment._id,
        resource: resource._id,
    });

    if (existingProgress) {
        return {
            success: true,
            action: "read",
        };
    }

    if (resource.displayOrder === 1) {
        return {
            success: true,
            action: "create",
        };
    }

    const previousResource = await Resource.findOne({
        module: module._id,
        displayOrder: resource.displayOrder - 1,
    });

    if (!previousResource) {
        throw authorizationError();
    }

    const previousProgress = await Progress.findOne({
        enrollment: enrollment._id,
        resource: previousResource._id,
        status: "completed",
    });

    if (!previousProgress) {
        throw authorizationError();
    }

    return {
        success: true,
        action: "create",
    };
}

export {isHaveAccessToThatResource, isHaveAccessToThatModule}
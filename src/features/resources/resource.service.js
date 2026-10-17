import Course from "../courses/course.module.js"
import Resource from "./resource.module.js";
import Module from "../modules/module.module.js";
import Progress from "../progressions/progress.module.js"
import Enrollment from "../enrollments/enrollment.module.js"
import "../uploads/upload.module.js";
import { removeUploadedFile, uploadFile } from "../uploads/upload.service.js";
import env from "../../config/env.js";
import { authorizeTarget, getAccessibleFilter } from "../../utils/accessControl.js";
import { isHaveAccessToThatModule, isHaveAccessToThatResource } from "../../utils/resourceAccessValidator.js";


async function getResources({ page, limit }, user) {
	const skip = (page - 1) * limit;
    const filter = await getAccessibleFilter(Resource, user, { requireEnrollment: true });

    const resources = await Resource.find(filter).populate("module").populate("upload").skip(skip).limit(limit).sort({ module: 1, displayOrder: 1 })
	const total = await Resource.countDocuments(filter)

	return {
		resources,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function getResourceById(resourceId, user)
 {
    await authorizeTarget({ Model: Resource, id: resourceId, user, mode: "read" });

    const resource = await Resource.findById(resourceId).populate({path: "module", populate: {path: "course"}}).populate("upload");

    if(!resource){
        throw notFound()
    }

    if(user.permission.scope === "all" || user.permission.scope === "own"){
        return resource
    }

    await isHaveAccessToThatModule(resource._id, user.userId)

    const result = await isHaveAccessToThatResource(resource._id, user.userId)

    if(result.success && result.action === "read"){
        return resource
    }

    if(result.success && result.action === "create"){
        const enrollment = await Enrollment.findOne({
        learner: user.userId,
        course: resource.module.course._id,
    })
        const progress = await Progress.create({
            enrollment,
            learner: user.userId,
            module: resource.module._id,
            resource: resource._id,
            status: "inProgress", 
        })

        if(!progress){
            const error = new Error()
            error.status = 500
            throw error
        }

        return resource
    }


}

async function createResource(resourceData, file, user) {

    const module = await Module.findById(resourceData.module).select("estimatedDuration course");
    const course = await Course.findById(module.course)

    console.log(module)

	if (!module) {
		const error = new Error("Module not found!");
		error.status = 404;
		throw error;
	}

    await authorizeTarget({ Model: Module, id: module._id, user, mode: "manage" });

	let resource = await Resource.create(resourceData)

    module.estimatedDuration = Number(module.estimatedDuration) +  Number(resource.estimatedDuration)
    course.estimatedDuration = Number(course.estimatedDuration) +  Number(resource.estimatedDuration)
    await module.save()
    await course.save()

    if(file){

        const upload = await uploadFile(file, "resource", resource._id, user.userId)

        resource.upload = upload._id
        resource.url = `${env.r2PublicUrl}/${upload.key}`

        await resource.save()
        await resource.populate("upload");

    }

    return resource
}

async function updateResource(resourceId, resourceData, file, user) {

    await authorizeTarget({ Model: Resource, id: resourceId, user, mode: "manage" });

    let resource = await Resource.findById(resourceId).populate("upload")

    const oldEstimatedDuration = Number(resource.estimatedDuration)

    if(!resource){
        const error = new Error("Resource not found!");
        error.status = 404;
        throw error;
    }

    const oldupload = resource.upload

    if (resourceData.module && resourceData.module.toString() !== resource.module.toString()) {
        await authorizeTarget({ Model: Module, id: resourceData.module, user, mode: "manage" });
    }

    Object.assign(resource, resourceData);

    if(file){
        const upload = await uploadFile(file, "resource", resourceData.module, user.userId)

        resource.upload = upload._id
        resource.url = `${env.r2PublicUrl}/${upload.key}`

    }

    await resource.save()
    resource = await Resource.findById(resource._id).populate({path : "module", populate: { path: "course" }}).populate("upload");

    const course = await Course.findById(resource.module.course)
    const module = await Module.findById(resource.module)

    const newEstimatedDuration = Number(resource.estimatedDuration)

    if(file && oldupload){
        await removeUploadedFile(oldupload.key)
    }

    module.estimatedDuration = Number(module.estimatedDuration) + (newEstimatedDuration - oldEstimatedDuration)
    course.estimatedDuration = Number(course.estimatedDuration) + (newEstimatedDuration - oldEstimatedDuration)
    await module.save()
    await course.save()

	return resource
}

async function deleteResource(resourceId, user) {

    await authorizeTarget({ Model: Resource, id: resourceId, user, mode: "manage" });

    const resource = await Resource.findById(resourceId).populate("upload").populate({path : "module", populate: { path: "course" }})

    console.log(resource)

    const course = await Course.findById(resource.module.course)
    const module = await Module.findById(resource.module)

    module.estimatedDuration = Number(module.estimatedDuration) - Number(resource.estimatedDuration)
    course.estimatedDuration = Number(course.estimatedDuration) - Number(resource.estimatedDuration)

    if(!resource){
        const error = new Error("Resource not found!");
        error.status = 404;
        throw error;
    }

    if(resource.upload){
        await removeUploadedFile(resource.upload.key)
    }

	return Resource.findByIdAndDelete(resourceId);
}

export {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    isHaveAccessToThatModule,
    isHaveAccessToThatResource,
};

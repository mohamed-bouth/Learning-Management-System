import Course from "../courses/course.module.js"
import Resource from "./resource.module.js";
import Module from "../modules/module.module.js";
import "../uploads/upload.module.js";
import { removeUploadedFile, uploadFile } from "../uploads/upload.service.js";
import env from "../../config/env.js";
import isHeOwningThat from "../../utils/isHeOwningThat.js";

async function getResources({ page, limit }) {
	const skip = (page - 1) * limit;

    const resources = await Resource.find().populate("module").populate("upload").skip(skip).limit(limit).sort({ module: 1, displayOrder: 1 })
	const total = await Resource.countDocuments()

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

function getResourceById(resourceId) {
	return Resource.findById(resourceId).populate("module").populate("upload");
}

async function createResource(resourceData, file, userId) {

	const module = await Module.findById(resourceData.module).populate("course");

	if (!module) {
		const error = new Error("Module not found!");
		error.status = 404;
		throw error;
	}

    const result = await isHeOwningThat(userId , module.course._id , Course, "user")

    if(!result.success){
        throw result.error
    }

	let resource = await Resource.create(resourceData)

    if(file){

        const upload = await uploadFile(file, "resource", resource._id, userId)

        resource.upload = upload._id
        resource.url = `${env.r2PublicUrl}/${upload.key}`

        await resource.save()
        await resource.populate("upload");

    }

    return resource
}

async function updateResource(resourceId, resourceData, file, userId) {

    const module = await Module.findById(resourceData.module).populate("course");

    if (!module) {
        const error = new Error("Module not found!");
        error.status = 404;
        throw error;
    }

    const result = await isHeOwningThat(userId , module.course._id , Course, "user")

    if(!result.success){
        throw result.error
    }

    let resource = await Resource.findById(resourceId).populate("upload")

    if(!resource){
        const error = new Error("Resource not found!");
        error.status = 404;
        throw error;
    }

    const oldupload = resource.upload

    Object.assign(resource, resourceData);

    if(file){
        const upload = await uploadFile(file, "resource", resourceData.module, userId)

        resource.upload = upload._id
        resource.url = `${env.r2PublicUrl}/${upload.key}`

    }

    await resource.save()
    resource = await Resource.findById(resource._id).populate("module").populate("upload");

    if(file && oldupload){
        await removeUploadedFile(oldupload.key)
    }

	return resource
}

async function deleteResource(resourceId, userId) {

    const resource = await Resource.findById(resourceId).populate("upload").populate({path : "module", populate: { path: "course"} })

    if(!resource){
        const error = new Error("Resource not found!");
        error.status = 404;
        throw error;
    }

    const result = await isHeOwningThat(userId , resource.module.course._id , Course, "user")

    if(!result.success){
        throw result.error
    }

    if(resource.upload){
        await removeUploadedFile(resource.upload.key)
    }

	return Resource.findByIdAndDelete(resourceId);
}

export { getResources, getResourceById, createResource, updateResource, deleteResource };

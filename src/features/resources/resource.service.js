import Course from "../courses/course.module.js"
import Resource from "./resource.module.js";
import Module from "../modules/module.module.js";
import "../uploads/upload.module.js";
import { removeUploadedFile, uploadFile } from "../uploads/upload.service.js";
import env from "../../config/env.js";
import { authorizeTarget, getAccessibleFilter } from "../../utils/accessControl.js";

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

async function getResourceById(resourceId, user) {
    await authorizeTarget({ Model: Resource, id: resourceId, user, mode: "read" });
    return Resource.findById(resourceId).populate("module").populate("upload");
}

async function createResource(resourceData, file, user) {

    const module = await Module.findById(resourceData.module).select("course");

	if (!module) {
		const error = new Error("Module not found!");
		error.status = 404;
		throw error;
	}

    await authorizeTarget({ Model: Module, id: module._id, user, mode: "manage" });

	let resource = await Resource.create(resourceData)

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
    resource = await Resource.findById(resource._id).populate("module").populate("upload");

    if(file && oldupload){
        await removeUploadedFile(oldupload.key)
    }

	return resource
}

async function deleteResource(resourceId, user) {

    await authorizeTarget({ Model: Resource, id: resourceId, user, mode: "manage" });

    const resource = await Resource.findById(resourceId).populate("upload")

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

export { getResources, getResourceById, createResource, updateResource, deleteResource };

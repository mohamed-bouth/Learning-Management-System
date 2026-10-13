import Resource from "./resource.module.js";
import Module from "../modules/module.module.js";
import "../uploads/upload.module.js";
import { removeUploadedFile, uploadFile } from "../uploads/upload.service.js";
import env from "../../config/env.js";

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

    const upload = await uploadFile(file, "resource", resourceData.module, userId)

	const module = await Module.findById(resourceData.module);

	if (!module) {
		const error = new Error("Module not found");
		error.status = 404;
		throw error;
	}

    if(upload) {
        resourceData.upload = upload._id
        resourceData.url = `${env.r2PublicUrl}/${upload.key}`
    }

	const resource = await Resource.create(resourceData)

    await resource.populate("upload");

    return resource
}

async function updateResource(resourceId, resourceData, file, userId) {
	if (resourceData.module) {
		const module = await Module.findById(resourceData.module);

		if (!module) {
			const error = new Error("Module not found");
			error.status = 404;
			throw error;
		}
	}

    const oldresource = await Resource.findById(resourceId).populate("upload")

    if(oldresource.upload){
        await removeUploadedFile(oldresource.upload.key)
    }

    const upload = await uploadFile(file, "resource", resourceData.module, userId)

    if(upload) {
        resourceData.upload = upload._id
        resourceData.url = `${env.r2PublicUrl}/${upload.key}`
    }
    

    const newresource = await Resource.findByIdAndUpdate(resourceId,resourceData,{ new: true },).populate("module").populate("upload");

	return newresource
}

async function deleteResource(resourceId) {

    const resource = await Resource.findById(resourceId).populate("upload")

    if(resource.upload){
        await removeUploadedFile(resource.upload.key)
    }

	return Resource.findByIdAndDelete(resourceId);
}

export { getResources, getResourceById, createResource, updateResource, deleteResource };

import Resource from "./resource.module.js";
import Module from "../modules/module.module.js";
import "../uploads/upload.module.js";

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

async function createResource(resourceData) {
	const module = await Module.findById(resourceData.module);

	if (!module) {
		const error = new Error("Module not found");
		error.status = 404;
		throw error;
	}

	return Resource.create(resourceData);
}

async function updateResource(resourceId, resourceData) {
	if (resourceData.module) {
		const module = await Module.findById(resourceData.module);

		if (!module) {
			const error = new Error("Module not found");
			error.status = 404;
			throw error;
		}
	}

    const resource = await Resource.findByIdAndUpdate(resourceId,resourceData,{ new: true, runValidators: true },).populate("module").populate("upload");

	return resource
}

function deleteResource(resourceId) {

	return Resource.findByIdAndDelete(resourceId);
}

export { getResources, getResourceById, createResource, updateResource, deleteResource };

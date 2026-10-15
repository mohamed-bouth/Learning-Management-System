import { getResources, getResourceById, createResource, updateResource, deleteResource } from "./resource.service.js";
import paginationSchema from "../../utils/paginationValidation.js";
import { createResourceSchema, updateResourceSchema } from "./resource.validation.js";

async function getAll(req, res, next) {
	try {
		const pagination = paginationSchema.safeParse(req.query);

		if (!pagination.success) {
			return next(pagination.error);
		}

		const { resources, meta } = await getResources(pagination.data, req.user);

		return res.status(200).json({
			success: true,
			data: { resources },
			meta,
		});
	} catch (error) {
		return next(error);
	}
}

async function getOne(req, res, next) {
	try {
		const resource = await getResourceById(req.params.id, req.user);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: { resource },
		});
	} catch (error) {
		return next(error);
	}
}

async function create(req, res, next) {
	try {
		const validation = createResourceSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const resource = await createResource(validation.data, req.file, req.user);

		return res.status(201).json({
			success: true,
			data: { resource },
		});
	} catch (error) {
		return next(error);
	}
}

async function update(req, res, next) {
	try {
		const validation = updateResourceSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const resource = await updateResource(req.params.id, validation.data, req.file , req.user);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: { resource },
		});
	} catch (error) {
		return next(error);
	}
}

async function remove(req, res, next) {
	try {
		const resource = await deleteResource(req.params.id, req.user);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		return res.status(204).send();
	} catch (error) {
		return next(error);
	}
}

export { getAll, getOne, create, update, remove };

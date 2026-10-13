import { getResources, getResourceById, createResource, updateResource, deleteResource } from "./resource.service.js";
import paginationSchema from "../../utils/paginationValidation.js";

async function getAll(req, res, next) {
	try {
		const pagination = paginationSchema.safeParse(req.query);

		if (!pagination.success) {
			return next(pagination.error);
		}

		const { resources, meta } = await getResources(pagination.data);

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
		const resource = await getResourceById(req.params.id);

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
		const resource = await createResource(req.body);

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
		const resource = await updateResource(req.params.id, req.body);

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
		const resource = await deleteResource(req.params.id);

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

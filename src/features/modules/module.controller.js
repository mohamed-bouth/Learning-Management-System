import {getModulesService, getModuleByIdService, getModulesByCourseService, createModuleService, updateModuleService, reorderModulesService, deleteModuleService} from "./module.service.js"
import paginationSchema from "../../utils/paginationValidation.js";
import { createModuleSchema, updateModuleSchema, reorderModulesSchema } from "./module.validation.js";

async function getModules(req, res, next) {
	try{
		const { page, limit } = req.query

		const pagination = paginationSchema.safeParse({ page, limit });

		if (!pagination.success) {
			return next(pagination.error)
		}

		const { modules, meta } = await getModulesService(pagination.data, req.user)

		return res.status(200).json({
            success: true,
            data: {
				modules
			},
			meta,
        });

	}catch(error){
		next(error)
	}
}

async function getOneWithResources(req, res, next) {
	try {

		const module = await getModuleByIdService(req.params.id, req.user);

		if (!module) {
			return res.status(404).json({
				success: false,
				message: "Module not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				module,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getModulesByCourse(req, res, next) {
	try{
		const id = req.params.id
		const modules = await getModulesByCourseService(id, req.user)
		return res.status(200).json({
            success: true,
			count: modules.length,
            data: {modules}
        });

	}catch(error){
		next(error)
	}
}

async function createModule(req, res, next){
	try{
		const validation = createModuleSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const module = await createModuleService(validation.data, req.user);
		return res.status(201).json({
            success: true,
            message: "Module created with seccess!",
            data: {module}
        });
	}catch(error){
		return next(error);
	}
}

async function updateModule(req, res, next) {
	try{
		const id = req.params.id;
		const validation = updateModuleSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

        const updateData = validation.data;
		const updatedModule =  await updateModuleService(id,updateData, req.user);
		return res.status(200).json({
            success: true,
            message: "Module updated with success!",
            data: {updatedModule}
        });
	}catch(error){
		next(error)
	}
}

async function reorderModules(req, res, next) {
    try {
        const { modules } = req.body;

		const validation = reorderModulesSchema.safeParse({ modules });

		if (!validation.success) {
			return next(validation.error);
        }

		await reorderModulesService(validation.data.modules, req.user);

        return res.status(200).json({
            success: true,
            message: "Modules order has updated with seccess!"
        });

    } catch (error) {
        return next(error);
    }
}

async function deleteModule(req, res, next) {
	try{
		const id = req.params.id;

		await deleteModuleService(id, req.user);

		return res.status(200).send()

	}catch(error){
		next(error)
	}
}

export { getOneWithResources, getModules, getModulesByCourse, createModule, updateModule, reorderModules, deleteModule }
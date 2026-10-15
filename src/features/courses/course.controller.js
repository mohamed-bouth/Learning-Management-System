import {
	getCourses,
	getCoursesForAuthUser,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
} from "./course.service.js";
import paginationSchema from "../../utils/paginationValidation.js";
import filterCourseSchema from "../../utils/filterCourseValidation.js";
import { createCourseSchema, updateCourseSchema } from "./course.validation.js";

async function getAll(req, res, next) {
	try {
		const { page, limit } = req.query

		const { category, level, title, sortBy, order } = req.query

		const pagination = paginationSchema.safeParse({ page, limit });

		const filter = filterCourseSchema.safeParse({ category, level, title, sortBy, order })

		if (!pagination.success) {
			return next(pagination.error)
		}

		if (!filter.success) {
			return next(filter.error)
		}

		const { courses, meta } = await getCourses({ ...pagination.data, ...filter.data });

		res.status(200).json({
			success: true,
			data: {
				courses,
			},
			meta,
		});
	} catch (error) {
		next(error);
	}
}

async function getAllForUser(req, res, next) {
	try {
		const { page, limit } = req.query

		const { category, level, title, sortBy, order } = req.query

		const pagination = paginationSchema.safeParse({ page, limit });

		const filter = filterCourseSchema.safeParse({ category, level, title, sortBy, order })

		if (!pagination.success) {
			return next(pagination.error)
		}

		if (!filter.success) {
			return next(filter.error)
		}

		const { courses, meta } = await getCoursesForAuthUser({ ...pagination.data, ...filter.data }, req.user);

		res.status(200).json({
			success: true,
			data: {
				courses,
			},
			meta,
		});
	} catch (error) {
		next(error);
	}
}

async function getOne(req, res, next) {
	try {
		const course = await getCourseById(req.params.id, [], req.user);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				course,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getOneWithModules(req, res, next) {
	try {

		const course = await getCourseById(req.params.id, ['modules'], req.user);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				course,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function create(req, res, next) {
	try {
		const validation = createCourseSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const course = await createCourse(validation.data, req.user.userId);

		res.status(201).json({
			success: true,
			data: {
				course,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function update(req, res, next) {
	try {
		const validation = updateCourseSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const course = await updateCourse(req.params.id, validation.data, req.user);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(200).json({
			success: true,
			data: {
				course,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function remove(req, res, next) {
	try {
		const course = await deleteCourse(req.params.id, req.user);

		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}

		res.status(204).send();
	} catch (error) {
		next(error);
	}
}

export { getAll, getOne, getOneWithModules, create, update, remove, getAllForUser };

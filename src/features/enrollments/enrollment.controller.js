import { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment } from "./enrollment.service.js";
import paginationSchema from "../../utils/paginationValidation.js";
import { createEnrollmentSchema, updateEnrollmentSchema, enrollmentFilterSchema } from "./enrollment.validation.js";

async function getAll(req, res, next) {
	try {
		const pagination = paginationSchema.safeParse(req.query);
		const filters = enrollmentFilterSchema.safeParse(req.query);

		if (!pagination.success) {
			return next(pagination.error);
		}

		if (!filters.success) {
			return next(filters.error);
		}

		const { enrollments, meta } = await getEnrollments({
			...pagination.data,
			...filters.data,
		});

		return res.status(200).json({
			success: true,
			data: { enrollments },
			meta,
		});
	} catch (error) {
		return next(error);
	}
}

async function getOne(req, res, next) {
	try {
		const enrollment = await getEnrollmentById(req.params.id);

		if (!enrollment) {
			return res.status(404).json({
				success: false,
				message: "Enrollment not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: { enrollment },
		});
	} catch (error) {
		return next(error);
	}
}

async function create(req, res, next) {
	try {
		const validation = createEnrollmentSchema.safeParse(req.body);

		if (!validation.success) {
			return next(validation.error);
		}

		const enrollment = await createEnrollment(validation.data, req.user.userId);

		return res.status(201).json({
			success: true,
			data: { enrollment },
		});
	} catch (error) {
		return next(error);
	}
}

async function update(req, res, next) {
	try {
		const validation = updateEnrollmentSchema.safeParse(req.body);

		if (!validation.success) {
            console.log("------->",validation.error)
			return next(validation.error);
		}

		const enrollment = await updateEnrollment(req.params.id, validation.data, req.user);

		if (!enrollment) {
			return res.status(404).json({
				success: false,
				message: "Enrollment not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: { enrollment },
		});
	} catch (error) {
		return next(error);
	}
}

async function remove(req, res, next) {
	try {
		const enrollment = await deleteEnrollment(req.params.id, req.user);

		if (!enrollment) {
			return res.status(404).json({
				success: false,
				message: "Enrollment not found",
			});
		}

		return res.status(204).send();
	} catch (error) {
		return next(error);
	}
}

export { getAll, getOne, create, update, remove };

import {
	getCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
} from "./course.service.js";
import isNumbers from "../../utils/isNumber.js"; 

async function getAll(req, res, next) {
	try {
        const { page = 1 , limit = 10 } = req.query

        if(!isNumbers([page,limit])){
            const error = new Error('Check your url !')
            error.status = 400
            error.description = 'please type valide page and limit parameters !'
            next(error)
        }

		const {courses , meta} = await getCourses({page,limit});

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
		const course = await getCourseById(req.params.id);

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
		const course = await createCourse(req.body);

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
		const course = await updateCourse(req.params.id, req.body);

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
		const course = await deleteCourse(req.params.id);

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

export { getAll, getOne, create, update, remove };

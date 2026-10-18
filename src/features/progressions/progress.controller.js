import { success } from "zod";
import { completeResourceProgression, getCoursesProgressionsService, getCoursesProgressionsByIdService } from "./progress.service.js";

async function complete(req, res, next) {
	try {
		const progression = await completeResourceProgression(
			req.params.id,
			req.user,
		);

		return res.status(200).json({
			success: true,
			data: { 
				progression 
			},
		});
	} catch (error) {
		return next(error);
	}
}

async function getCourseProgressions(req, res, next) {
	try {

		const courses = await getCoursesProgressionsService(req.user)

		return res.status(200).json({
			success: true,
			data: {
				courses
			}
		})
	}catch (error) {
		return next(error)
	}
}

async function getCourseProgressionsById(req, res, next) {
	try {

		const courses = await getCoursesProgressionsByIdService(req.params.id, req.user)

		return res.status(200).json({
			success: true,
			data: {
				courses
			}
		})
	}catch (error) {
		return next(error)
	}
}

export { complete, getCourseProgressions, getCourseProgressionsById };

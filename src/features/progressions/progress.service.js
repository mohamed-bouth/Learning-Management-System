import Progress from "./progress.module.js";
import Enrollment from "../enrollments/enrollment.module.js";
import Module from "../modules/module.module.js";
import Resource from "../resources/resource.module.js";
import Course from "../courses/course.module.js"
import { authorizationError, authorizeTarget, getAccessibleCourseFilter, notFoundError } from "../../utils/accessControl.js";
import { isHaveAccessToThatModule, isHaveAccessToThatResource } from "../resources/resource.service.js";
import { populate } from "dotenv";

async function updateEnrollmentProgress(enrollment) {
	const modules = await Module.find({ course: enrollment.course }).select("_id");
	const moduleIds = modules.map((module) => module._id);

	const numberOfResources = await Resource.countDocuments({ module: { $in: moduleIds } })
	const numberOfCompletedProgressions = await Progress.countDocuments({ enrollment: enrollment._id, status: "completed" })

	let progress = 0

	if(numberOfResources > 0){
		progress = Math.min(100, (numberOfCompletedProgressions / numberOfResources) * 100);
	}

	return Enrollment.findByIdAndUpdate(
		enrollment._id,
		{ $set: { progress } },
		{ new: true, runValidators: true },
	);
}

async function completeResourceProgression(resourceId, user) {

    const currentResource = await Resource.findById(resourceId).populate({path: "module", select: "course", populate: {path: "course", select: "_id"}});

    if (!currentResource?.module?.course) {
        throw authorizationError();
    }

    const courseId = currentResource.module.course._id;

    const enrollment = await Enrollment.findOne({
        learner: user.userId,
        course: courseId,
        status: "active"
    });

    if (!enrollment) {
        throw authorizationError();
    }

	const progression = await Progress.findOne({
        enrollment: enrollment._id,
        resource: resourceId,
    })
		.populate({
			path: "module",
			select: "course order",
		})
		.populate({
			path: "resource",
			select: "module displayOrder",
		});

	if (!progression) {
		throw notFoundError('progress');
	}

	const module = progression.module;
	const resource = progression.resource;

	if (!enrollment || enrollment.learner.toString() !== user.userId.toString()) {
		throw authorizationError();
	}

	if (enrollment.status === "cancelled" || module?.course?.toString() !== enrollment.course.toString() || resource?.module?.toString() !== module._id.toString()
	) {
		throw authorizationError();
	}

	if (progression.status === "completed") {
		return progression;
	}

	if (enrollment.status !== "active") {
		throw authorizationError("Only active enrollments can be progressed");
	}

	await isHaveAccessToThatModule(resourceId, user.userId);
	await isHaveAccessToThatResource(resourceId, user.userId);

	const completedAt = new Date();
	const updatedProgression = await Progress.findOneAndUpdate(
		{
			_id: progression._id,
			status: "inProgress",
		},
		{
			$set: {
				status: "completed",
				completedAt,
				lastAccessedAt: completedAt,
			},
		},
		{ new: true, runValidators: true },
	);

	await updateEnrollmentProgress(enrollment);

	return updatedProgression
}

async function getCoursesProgressionsService(user){
	
	const filter = await getAccessibleCourseFilter(user, { requireEnrollment : true })

	const courses = await Course.find(filter).
	populate({path: "user", select: "name"}).
	populate({path: "category", select: "name"}).
	populate({path: 'enrollments', populate:[ {path: "learner", select: "name _id"}, {path: "progressions" , select: " resource status completedAt startedAt" , populate: {path: "resource", select: " title"}}]})

	if(user.permission.scope === 'published'){
		console.log('published')
		courses.forEach(course => {
			const courseEnrollments = course.enrollments.filter((enrollment) => {
				if(enrollment.learner._id.toString() === user.userId.toString()){
					return enrollment
				}
			})

			course.enrollments = courseEnrollments
		});
	}

	return courses
}

async function getCoursesProgressionsByIdService(courseId, user){

	await authorizeTarget({
		Model: Course,
		id: courseId,
		user,
		mode: "read",
		requireEnrollment: true
	})

	const courses = await Course.findById(courseId).
	populate({path: "user", select: "name"}).
	populate({path: "category", select: "name"}).
	populate({path: 'enrollments', populate:[ {path: "learner", select: "name _id"}, {path: "progressions" , select: " resource status completedAt startedAt" , populate: {path: "resource", select: " title"}}]})

	if(user.permission.scope === 'published'){
		courses.forEach(course => {
			const courseEnrollments = course.enrollments.filter((enrollment) => {
				if(enrollment.learner._id.toString() === user.userId.toString()){
					return enrollment
				}
			})

			course.enrollments = courseEnrollments
		});
	}

	return courses
}

export { completeResourceProgression, getCoursesProgressionsService, getCoursesProgressionsByIdService };

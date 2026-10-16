import Progress from "./progress.module.js";
import Enrollment from "../enrollments/enrollment.module.js";
import Module from "../modules/module.module.js";
import Resource from "../resources/resource.module.js";
import { isHaveAccessToThatModule, isHaveAccessToThatResource } from "../resources/resource.service.js";
import { authorizationError } from "../../utils/accessControl.js";

function notFoundError() {
	const error = new Error("Progression not found");
	error.status = 404;
	return error;
}

async function updateEnrollmentProgress(enrollment) {
	const modules = await Module.find({ course: enrollment.course }).select("_id");
	const moduleIds = modules.map((module) => module._id);

	const [numberOfResources, numberOfCompletedProgressions] = await Promise.all([
		Resource.countDocuments({ module: { $in: moduleIds } }),
		Progress.countDocuments({ enrollment: enrollment._id, status: "completed" }),
	]);

	const progress = numberOfResources === 0
		? 0
		: Math.min(100, (numberOfCompletedProgressions / numberOfResources) * 100);

	return Enrollment.findByIdAndUpdate(
		enrollment._id,
		{ $set: { progress } },
		{ new: true, runValidators: true },
	);
}

async function completeResourceProgression(resourceId, user) {

    const currentResource = await Resource.findById(resourceId)
    .populate({
        path: "module",
        select: "course",
        populate: {
            path: "course",
            select: "_id"
        }
    });

    if (!currentResource?.module?.course) {
        throw authorizationError();
    }

    const currentCourseId = currentResource.module.course._id;

    const currentEnrollment = await Enrollment.findOne({
        learner: user.userId,
        course: currentCourseId,
        status: "active"
    });

    if (!currentEnrollment) {
        throw authorizationError();
    }

	const progression = await Progress.findOne({
        enrollment: currentEnrollment._id,
        resource: resourceId,
        status: "inProgress"
    })
		.populate({
			path: "enrollment",
			select: "learner course status",
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
		throw notFoundError();
	}

	const enrollment = progression.enrollment;
	const module = progression.module;
	const resource = progression.resource;

	if (
		!enrollment ||
		enrollment.learner.toString() !== user.userId.toString()
	) {
		throw authorizationError();
	}

	if (
		enrollment.status === "cancelled" ||
		module?.course?.toString() !== enrollment.course.toString() ||
		resource?.module?.toString() !== module._id.toString()
	) {
		throw authorizationError();
	}

	if (progression.status === "completed") {
		return progression;
	}

	if (enrollment.status !== "active") {
		throw authorizationError("Only active enrollments can be progressed");
	}

	await isHaveAccessToThatModule(module, user.userId);
	await isHaveAccessToThatResource(resource, user.userId);

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

	return updatedProgression || Progress.findById(progression._id);
}

export { completeResourceProgression };

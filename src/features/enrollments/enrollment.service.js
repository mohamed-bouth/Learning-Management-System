import Enrollment from "./enrollment.module.js";
import User from "../users/user.module.js";
import Course from "../courses/course.module.js";
import { authorizeTarget } from "../../utils/accessControl.js";

async function ensureNotAlreadyEnrolled(learner, course, excludedId = null) {
	const filter = { learner, course };

	if (excludedId) {
		filter._id = { $ne: excludedId };
	}

	const existingEnrollment = await Enrollment.findOne(filter);

	if (existingEnrollment) {
		const error = new Error("User is already enrolled in this course");
		error.status = 409;
		throw error;
	}
}

async function ensureReferencesExist(learner, course ) {

	const user = await User.findById(learner)
	const course_ = await Course.findById(course)

	if (!user) {
		const error = new Error("User not found");
		error.status = 404;
		throw error;
	}

	if (!course_) {
		const error = new Error("Course not found");
		error.status = 404;
		throw error;
	}
}

async function getEnrollments(body) {

    const { page, limit, userId, course, status } = body

	const filter = {};

	if (userId) {
		filter.learner = userId;
	}

	if (course) {
		const courses = await Course.find({
            title: {
                $regex: course,
                $options: "i"
            }
        }).select("_id");

        filter.course = {
            $in: courses.map(course => course._id)
        };
	}

	if (status) {
		filter.status = status;
	}

	const skip = (page - 1) * limit;

	const enrollments = await Enrollment.find(filter).populate("learner", "name email").populate("course").skip(skip).limit(limit).sort({ enrolledAt: -1 })

    const total = await Enrollment.countDocuments(filter)

	return {
		enrollments,
		meta: {
			page,
			limit,
			total,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function getEnrollmentById(enrollmentId) {

	const enrollment = await Enrollment.findById(enrollmentId).populate("learner", "name email").populate("course");

    return enrollment
}

async function createEnrollment({course}, userId) {

	const data = {
		learner: userId,
		course,
		enrolledAt: new Date(),
		status: "active",
		progress: 0,
	};

	await ensureReferencesExist(data.learner, data.course);
	await ensureNotAlreadyEnrolled(data.learner, data.course);

	return Enrollment.create(data);
}

async function updateEnrollment(enrollmentId, enrollmentData, user) {

	const currentEnrollment = await Enrollment.findById(enrollmentId).populate('course');

	if (!currentEnrollment) {
		return null;
	}

	await authorizeTarget({
		Model: Course,
		id: currentEnrollment.course._id,
		user,
		mode: "manage",
	});

	return Enrollment.findByIdAndUpdate(
		enrollmentId,
		enrollmentData,
		{ new: true, runValidators: true },
	).populate("learner", "name email").populate("course");
}

async function deleteEnrollment(enrollmentId, user) {

    const currentEnrollment = await Enrollment.findById(enrollmentId).populate('course');

	if (!currentEnrollment) {
		return null;
	}

	await authorizeTarget({
		Model: Course,
		id: currentEnrollment.course._id,
		user,
		mode: "manage",
	});

	await Enrollment.findByIdAndDelete(enrollmentId);

    return
}

export { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };

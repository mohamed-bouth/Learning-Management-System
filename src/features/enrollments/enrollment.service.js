import Enrollment from "./enrollment.module.js";
import User from "../users/user.module.js";
import Course from "../courses/course.module.js";
import { authorizeTarget, getAccessibleEnrollments } from "../../utils/accessControl.js";

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

async function getEnrollments(body, user) {

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

        filter.course = courses.map(course => course._id)
	}

	const CourseIds = await getAccessibleEnrollments(user)

	if(filter.course){
			const matchedCoursesIds =  CourseIds.reduce((matched , courseIdfromBase) => {
				filter.course.forEach(coursefromsearch => {
					if(coursefromsearch.toString() === courseIdfromBase.toString()){
						return matched.push(courseIdfromBase)
					}
				});
				return matched
			},[])

			filter.course = { $in: matchedCoursesIds };
	}else{
		filter.course = {$in: CourseIds}
	}

	console.log(filter.course)

	if (status) {
		filter.status = status;
	}

	const skip = (page - 1) * limit;

	let enrollments = await Enrollment.find(filter).populate("learner", "_id name email").populate("course").skip(skip).limit(limit).sort({ enrolledAt: -1 })

	if(user.permission.scope === "published"){
		enrollments = enrollments.filter(enrollemnt => enrollemnt.learner._id.toString() === user.userId.toString())
	}

    const total = enrollments.length

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

async function getEnrollmentById(enrollmentId, user) {

	const currentEnrollment = await Enrollment.findById(enrollmentId).populate('course');

	if (!currentEnrollment) {
		return null;
	}

	await authorizeTarget({
		Model: Course,
		id: currentEnrollment.course._id,
		user,
		mode: "read",
	});

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

	const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);

    return enrollment
}

export { getEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment };

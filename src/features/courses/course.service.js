import Course from "./course.module.js";
import Module from "../modules/module.module.js"

async function getCourses(metaData) {
    const { page , limit } = metaData
    const skip = (page - 1) * limit
	const courses = await Course.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Course.countDocuments();
    const totalPages = Math.ceil(total / limit)

    return {
        courses,
        meta: {
            page,
            limit,
            total,
            totalPages,
        }
    }
}

async function getCourseById(courseId, collections = []) {

	let query = Course.findById(courseId)

    collections.forEach(collection => {
        query = query.populate(collection)
    })

    return query
}

function createCourse(courseData) {

	const course = Course.create(courseData);

    return course
}

function updateCourse(courseId, courseData) {

	const course = Course.findByIdAndUpdate(
		courseId,
		courseData,
		{ new: true, runValidators: true },
	);

    return course
}

function deleteCourse(courseId) {

	const course = Course.findByIdAndDelete(courseId);

    return course 
}

export {
	getCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse,
};

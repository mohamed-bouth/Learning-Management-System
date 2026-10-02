import Course from "./course.module.js";

function getCourses() {

	const courses = Course.find().sort({ createdAt: -1 });

    return courses
}

function getCourseById(courseId) {

	const course = Course.findById(courseId);

    return course
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

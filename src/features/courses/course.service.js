import Course from "./course.module.js";
import Module from "../modules/module.module.js"
import Category from "../categories/category.module.js"

async function getCourses(metaData) {
    const { category , level , title , sortBy , order } = metaData

    console.log(sortBy,order)

    const categoryAfterSearch = await Category.find({
        name: {
            $regex: category,
            $options: "i"
        }
    })

    const categoryIds = categoryAfterSearch.map(category => category._id);

    const filterOption = { category: categoryIds, level, title }
    const filterOptionToArray = Object.entries(filterOption)

    const filter = filterOptionToArray.reduce((filterObj, option) => {
        if (Array.isArray(option[1])) {
            filterObj[option[0]] = {
                $in: option[1]
            }
        }
        else if (option[1]) {
            filterObj[option[0]] = {
                $regex: option[1],
                $options: "i"
            }
        }
        return filterObj
    }, {})


    const { page, limit } = metaData
    const skip = (page - 1) * limit
    const courses = await Course.find(filter).skip(skip).limit(limit).sort({ [sortBy]: order === "asc" ? 1 : -1 }).populate('category');
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

function createCourse(courseData, userId) {
    courseData["userId"] = userId
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

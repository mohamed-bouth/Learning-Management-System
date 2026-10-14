import Course from "./course.module.js";
import Module from "../modules/module.module.js"
import Category from "../categories/category.module.js"
import { hasAccess } from "../../utils/checkOwnership.js";



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

    filter.publicationStatus = 'published'


    const { page, limit } = metaData
    const skip = (page - 1) * limit
    const courses = await Course.find(filter).skip(skip).limit(limit).sort({ [sortBy]: order === "asc" ? 1 : -1 }).populate('category');
    const total = await Course.countDocuments(filter);
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

async function getCoursesForAuthUser(metaData, user) {
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

    const scope = user.permission.scope

    console.log(scope)

    if (scope === "published") {
        filter.publicationStatus = "published";
    } else if (scope === "own") {
        filter.user = user.userId;
    }


    const { page, limit } = metaData
    const skip = (page - 1) * limit
    const courses = await Course.find(filter).skip(skip).limit(limit).sort({ [sortBy]: order === "asc" ? 1 : -1 }).populate('category');
    const total = await Course.countDocuments(filter);
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

async function getCourseById(courseId, collections = [], user) {

    if(collections.length > 0){

        const ownership = {
            userId: user.userId,
            thingId: courseId,
            Model: Course,
            field: "user"
        }

        await hasAccess(ownership, user.permission.scope, courseId)

    }

    let query = Course.findById(courseId)

    collections.forEach(collection => {
        query = query.populate(collection)
    })

    return query
}

function createCourse(courseData, userId) {
    courseData["user"] = userId
    const course = Course.create(courseData);

    return course
}

async function updateCourse(courseId, courseData, user) {
    await hasAccess(
        {
            userId: user.userId,
            thingId: courseId,
            Model: Course,
            field: "user",
        },
        user.permission.scope,
    );


    const course = await Course.findByIdAndUpdate(
        courseId,
        courseData,
        { new: true, runValidators: true },
    );

    return course
}

async function deleteCourse(courseId, user) {
    await hasAccess(
        {
            userId: user.userId,
            thingId: courseId,
            Model: Course,
            field: "user",
        },
        user.permission.scope,
    );

    const course = await Course.findByIdAndDelete(courseId);

    return course
}

export {
    getCourses,
    getCoursesForAuthUser,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};

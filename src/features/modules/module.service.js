import Module from "./module.module.js"
import Resource from "../resources/resource.module.js"
import Course from "../courses/course.module.js"
import mongoose from "mongoose"

async function getModulesService(metaData) {

    const { page, limit } = metaData
    const skip = (page - 1) * limit
    const modules = await Module.find().skip(skip).limit(limit).sort({course: "asc"})
    const total = await Module.countDocuments();
    const totalPages = Math.ceil(total / limit)

    return{ 
        modules,
        meta: {
                page,
                limit,
                total,
                totalPages,
        }
    }
}

async function getModuleByIdService(moduleId) {

    let module = await Module.findById(moduleId).populate('resources')

    return module
}

async function  getModulesByCourseService(courseId) {

    const modules = await Module.find({ course: courseId }).sort({order: "asc"});

    return modules;
}

async function createModuleService (moduleData){

    if(!moduleData.course){
        const error = new Error("Course id not found!");
        error.name =  "ValidationError"
        error.status = 401;
        throw error;
    }

    const course = await Course.findById(moduleData.course);

    if(!course){
        const error = new Error("Course not Found");
        error.status, 404;
        throw error;
    }

    const NumberofModulesOnCourse = await Module.find({course : course._id}).countDocuments()

    moduleData.order = NumberofModulesOnCourse + 1

    const newModule = await Module.create(moduleData);

    return newModule;
}

async function updateModuleService(moduleId, updateData) {

    const updateModel = await Module.findByIdAndUpdate(moduleId, updateData, {new: true })

    return updateModel
}

async function deleteModuleService(moduleId){

    const module = await Module.findByIdAndDelete(moduleId)

    return module
}

async function reorderModulesService(modulesOrder) {
    try {

        const session = await mongoose.startSession();

        await session.withTransaction(async () => {
            for (const item of modulesOrder) {
                const module = await Module.findByIdAndUpdate(
                    item.id,
                    { order: item.order },
                    {
                        new: true,
                        session
                    }
                );

                if (!module) {
                    const error = new Error(
                        `Module not found: ${item.id}`
                    );
                    error.statusCode = 404;
                    throw error;
                }
            }
        });

        return true;
    } finally {
        await session.endSession();
    }
}


export { getModulesService, getModuleByIdService, getModulesByCourseService, createModuleService, updateModuleService, reorderModulesService, deleteModuleService }
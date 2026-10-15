import Module from "./module.module.js"
import Resource from "../resources/resource.module.js"
import Course from "../courses/course.module.js"
import mongoose from "mongoose"
import { authorizeTarget, getAccessibleFilter } from "../../utils/accessControl.js";

async function getModulesService(metaData, user) {

    const { page, limit } = metaData
    const skip = (page - 1) * limit
    const filter = await getAccessibleFilter(Module, user, { requireEnrollment: true })
    const modules = await Module.find(filter).skip(skip).limit(limit).sort({course: "asc"})
    const total = await Module.countDocuments(filter);
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

async function getModuleByIdService(moduleId, user) {

    await authorizeTarget({ Model: Module, id: moduleId, user, mode: "read" })

    let module = await Module.findById(moduleId).populate('resources')

    return module
}

async function  getModulesByCourseService(courseId, user) {
    await authorizeTarget({ Model: Course, id: courseId, user, mode: "read" });

    const modules = await Module.find({ course: courseId }).sort({order: "asc"});

    return modules;
}

async function createModuleService (moduleData, user){

    if(!moduleData.course){
        const error = new Error("Course id not found!");
        error.name =  "ValidationError"
        error.status = 401;
        throw error;
    }

    const course = await Course.findById(moduleData.course);

    if(!course){
        const error = new Error("Course not Found");
        error.status = 404;
        throw error;
    }

    await authorizeTarget({ Model: Course, id: course._id, user, mode: "manage" });

    const NumberofModulesOnCourse = await Module.find({course : course._id}).countDocuments()

    moduleData.order = NumberofModulesOnCourse + 1

    const newModule = await Module.create(moduleData);

    return newModule;
}

async function updateModuleService(moduleId, updateData, user) {

    await authorizeTarget({ Model: Module, id: moduleId, user, mode: "manage" })

    const updateModel = await Module.findByIdAndUpdate(moduleId, updateData, {new: true })

    return updateModel
}

async function deleteModuleService(moduleId, user){

    await authorizeTarget({ Model: Module, id: moduleId, user, mode: "manage" })

    const module = await Module.findByIdAndDelete(moduleId)

    return module
}

async function reorderModulesService(modulesOrder, user) {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            for (const item of modulesOrder) {
                await authorizeTarget({ Model: Module, id: item.id, user, mode: "manage" })
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
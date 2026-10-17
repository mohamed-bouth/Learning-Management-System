import Course from "../features/courses/course.module.js";
import Module from "../features/modules/module.module.js";
import Resource from "../features/resources/resource.module.js";
import Enrollment from "../features/enrollments/enrollment.module.js";

const activeEnrollmentStatuses = ["active", "completed"];

const targetResolvers = new Map([
    [Course.modelName, async (id) => Course.findById(id).select("user publicationStatus")],
    [Module.modelName, async (id) => Module.findById(id).select("course")],
    [Resource.modelName, async (id) => Resource.findById(id).select("module")],
]);

function authorizationError(message = "Access prohibited !") {
    const error = new Error(message);
    error.name = "AuthorizationError";
    error.status = 403;
    return error;
}

function notFoundError(modelName) {
    const error = new Error(`${modelName} not Found !`);
    error.status = 404;
    return error;
}

function isSameId(left, right) {
    return left?.toString() === right?.toString();
}

async function resolveCourse(targetModel, targetId) {
    const resolver = targetResolvers.get(targetModel.modelName);

    if (!resolver) {
        throw new Error(`No access resolver configured for ${targetModel.modelName}`);
    }

    let target;
    try {
        target = await resolver(targetId);
    } catch (error) {
        if (error.name === "CastError") {
            throw notFoundError(targetModel.modelName);
        }
        throw error;
    }
    if (!target) {
        throw notFoundError(targetModel.modelName);
    }

    if (targetModel === Course) {
        return { target, course: target };
    }

    if (!target.course && targetModel === Module) {
        throw notFoundError("Course");
    }

    if (targetModel === Resource && !target.module) {
        throw notFoundError("Module");
    }

    const module = targetModel === Module
        ? target
        : await Module.findById(target.module).select("course");

    if (!module?.course) {
        throw notFoundError("Course");
    }

    const course = await Course.findById(module.course).select("user publicationStatus");
    if (!course) {
        throw notFoundError("Course");
    }

    return { target, course };
}

async function isActivelyEnrolled(userId, courseId) {
    return Enrollment.exists({
        learner: userId,
        course: courseId,
        status: { $in: activeEnrollmentStatuses },
    });
}

async function authorizeTarget({ Model, id, user, mode = "read", requireEnrollment = true }) {
    const { target, course } = await resolveCourse(Model, id);
    const scope = user?.permission?.scope;

    if (scope === "all") {
        return { target, course };
    }

    if (scope === "own") {
        if (!isSameId(course.user, user.userId)) {
            throw authorizationError();
        }
        return { target, course };
    }

    if (scope === "published") {
        if (mode !== "read" || course.publicationStatus !== "published") {
            throw authorizationError();
        }

        if (requireEnrollment && !(await isActivelyEnrolled(user.userId, course._id))) {
            throw authorizationError();
        }

        return { target, course };
    }

    throw authorizationError();
}

async function getAccessibleCourseFilter(user, { requireEnrollment = false } = {}) {
    const scope = user?.permission?.scope;

    if (scope === "all") {
        return {};
    }

    if (scope === "own") {
        return { user: user.userId };
    }

    if (scope === "published") {
        const filter = { publicationStatus: "published" };

        if (requireEnrollment) {
            const enrolledCourseIds = await Enrollment.find({
                learner: user.userId,
                status: { $in: activeEnrollmentStatuses },
            }).distinct("course");

            filter._id = { $in: enrolledCourseIds };
        }

        return filter;
    }

    throw authorizationError();
}

async function getAccessibleFilter(Model, user, options = {}) {
    const courseFilter = await getAccessibleCourseFilter(user, options);

    if (Model === Course) {
        return courseFilter;
    }

    const courseIds = await Course.find(courseFilter).distinct("_id");

    if (Model === Module) {
        return { course: { $in: courseIds } };
    }

    if (Model === Resource) {
        const moduleIds = await Module.find({ course: { $in: courseIds } }).distinct("_id");
        return { module: { $in: moduleIds } };
    }

    throw new Error(`No access filter configured for ${Model.modelName}`);
}

async function getAccessibleEnrollments(user) {
    const scope = user.permission.scope;

    if (scope === "all") {
        return await Course.distinct("_id");
    }

    if (scope === "own") {
        return await Course.distinct("_id", {user: user.userId});
    }

    if (scope === "published") {
        return await Enrollment.distinct("course", {learner: user.userId});
    }

    throw new Error("Invalid permission scope");
}

export {
    authorizationError,
    authorizeTarget,
    getAccessibleCourseFilter,
    getAccessibleFilter,
    getAccessibleEnrollments,
    notFoundError
};
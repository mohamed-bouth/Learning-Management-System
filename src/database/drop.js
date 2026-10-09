import mongoose from "mongoose";
import env from "../config/env.js"

import Category from "../features/categories/category.module.js"
import Course from "../features/courses/course.module.js"
import Module from "../features/modules/module.module.js"
import Resource from "../features/resources/resource.module.js"
import Permission from "../features/permissions/permission.module.js"
import Role from "../features/roles/role.module.js"
import User from "../features/users/user.module.js"


async function drop() {
    try {
        await mongoose.connect(env.mongoUri);

        console.log("Connected to MongoDB");

        await Resource.deleteMany();
        await Category.deleteMany();
        await Module.deleteMany();
        await Course.deleteMany();
        await Permission.deleteMany();
        await Role.deleteMany();
        await User.deleteMany();

    } catch (error) {

        console.error(error)

    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

drop()
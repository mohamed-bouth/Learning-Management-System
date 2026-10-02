import mongoose from "mongoose";
import env from "../config/env.js"

import Category from "../features/categories/category.module.js"
import Course from "../features/courses/course.module.js"
import Module from "../features/modules/module.module.js"
import Resource from "../features/resources/resource.module.js"


async function drop() {
    try {
        await mongoose.connect(env.mongoUri);

        console.log("Connected to MongoDB");

        await Category.deleteMany();
        await Resource.deleteMany();
        await Module.deleteMany();
        await Course.deleteMany();

    } catch (error) {

        console.error(error)

    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

drop()
import mongoose from "mongoose";
import env from "../config/env.js"


import Category from "../features/categories/category.module.js"
import Course from "../features/courses/course.module.js"
import Module from "../features/modules/module.module.js"
import Resource from "../features/resources/resource.module.js"
import Permission from "../features/permissions/permission.module.js";
import permissionsData from "./data/permissions.data.js";

async function seed() {
    try {
        await mongoose.connect(env.mongoUri);

        console.log("Connected to MongoDB");

        const createdPermissions = await Permission.insertMany(permissionsData);

        const categories = await Category.insertMany([
            {
                name: "JavaScript",
                // description: "",
            },
            {
                name: "Node.js",
                // description: "",
            }
        ]);

        const courses = await Course.insertMany([
            {
                category: categories[0]._id,
                title: "JavaScript Fundamentals",
                description: "Learn the fundamentals of JavaScript.",
                level: "normal",
                objective: "Learn the funcamentals of JavaScript and how to Code on real life",
                estimatedDuration: 60,
                publicationStatus: "published",
                publicationDate: "2026-11-04T12:17:48.770Z"
            },
            {
                category: categories[1]._id,
                title: "Node.js and Express",
                description: "Build backend applications with Node.js and Express.",
                level: "hard",
                objective: "Learn how node.js is working and the different between them and browser runtime ",
                estimatedDuration: 60,
                publicationStatus: "draft",
                publicationDate: "2026-10-04T12:17:48.770Z"
            }
        ]);


        const modules = await Module.insertMany([
            {
                course: courses[0]._id,
                title: "Variables and Data Types",
                description: "Learn variables and JavaScript data types.",
                order: 1,
                estimatedDuration: 60
            },
            {
                course: courses[0]._id,
                title: "Functions",
                description: "Learn how to create and use functions.",
                order: 2,
                estimatedDuration: 90
            },
            {
                course: courses[1]._id,
                title: "Introduction to Express",
                description: "Learn the basics of Express.js.",
                order: 1,
                estimatedDuration: 75
            }
        ]);

        await Resource.insertMany([
            {
                module: modules[0]._id,
                title: "JavaScript Variables",
                description: "Introduction to variables in JavaScript.",
                type: "article",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
                originalFileName: "javascript-variables.pdf",
                fileSize: 1024,
                estimatedDuration: "15 minutes",
                displayOrder: 1
            },
            {
                module: modules[0]._id,
                title: "Data Types Video",
                description: "Video explaining JavaScript data types.",
                type: "video",
                url: "https://example.com/javascript-data-types",
                originalFileName: "data-types.mp4",
                fileSize: 2048,
                estimatedDuration: "20 minutes",
                displayOrder: 2
            },
            {
                module: modules[1]._id,
                title: "Functions Exercise",
                description: "Practice JavaScript functions.",
                type: "exercise",
                url: "https://example.com/functions-exercise",
                originalFileName: "functions-exercise.pdf",
                fileSize: 1500,
                estimatedDuration: "30 minutes",
                displayOrder: 1
            }
        ]);

        console.log("Database seeded successfully");

    } catch (error) {
        console.error("Seed failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}
seed();
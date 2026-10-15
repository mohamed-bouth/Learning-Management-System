import mongoose from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid ObjectId",
});

const courseFields = {
    category: objectId,
    title: z.string().trim().min(3).max(256),
    description: z.string().trim().min(3).max(256),
    level: z.enum(["easy", "normal", "hard"]),
    objective: z.string().trim().min(16),
    estimatedDuration: z.coerce.number().min(0),
    publicationStatus: z.enum(["draft", "inpublished", "published"]).optional(),
    publicationDate: z.coerce.date().nullable().optional(),
};

const createCourseSchema = z.object(courseFields);

const updateCourseSchema = createCourseSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" },
);

export { createCourseSchema, updateCourseSchema };

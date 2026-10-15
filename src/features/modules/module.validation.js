import mongoose from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid ObjectId",
});

const moduleFields = {
    course: objectId,
    title: z.string().trim().min(3).max(256),
    description: z.string().trim().min(3).max(256),
    estimatedDuration: z.coerce.number().min(0),
};

const createModuleSchema = z.object(moduleFields);

const updateModuleSchema = createModuleSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" },
).extend({
    order: z.coerce.number().int().min(1).optional(),
});

const reorderModulesSchema = z.object({
    modules: z.array(z.object({
        id: objectId,
        order: z.coerce.number().int().min(1),
    })).min(1),
});

export { createModuleSchema, updateModuleSchema, reorderModulesSchema };

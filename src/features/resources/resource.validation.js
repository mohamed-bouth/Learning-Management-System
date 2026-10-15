import mongoose from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid ObjectId",
});

const resourceFields = {
    module: objectId,
    title: z.string().trim().min(3).max(256),
    description: z.string().trim().min(3).max(256),
    type: z.enum([
        "article",
        "video",
        "externalLink",
        "pdf",
        "image",
        "exercise",
        "codeRepository",
        "courseMaterial",
    ]),
    estimatedDuration: z.string().trim().min(1),
    displayOrder: z.coerce.number().int().min(1),
    url: z.string().trim().optional(),
};

const createResourceSchema = z.object(resourceFields);

const updateResourceSchema = createResourceSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" },
);

export { createResourceSchema, updateResourceSchema };

import { z } from "zod";

const categoryFields = {
    name: z.string().trim().min(3).max(64),
    description: z.string().trim().min(3).max(256).optional(),
};

const createCategorySchema = z.object(categoryFields);

const updateCategorySchema = createCategorySchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required" },
);

export { createCategorySchema, updateCategorySchema };

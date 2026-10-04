import z from "zod"

const filterCourseSchema = z.object({
    category: z.string().trim().toLowerCase().optional().default(''),

    level: z.string().trim().toLowerCase().optional().default(''),

    title: z.string().trim().toLowerCase().optional().default(''),

    sortBy: z.enum(["createdAt", "publicationDate"]).optional().default("createdAt"),

    order: z.enum(["asc", "desc"]).optional().default('desc'),
})

export default filterCourseSchema
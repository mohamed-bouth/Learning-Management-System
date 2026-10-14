import mongoose from "mongoose";
import { z } from "zod";

const objectId = z.string().refine((value) => mongoose.isValidObjectId(value), {
	message: "Invalid ObjectId",
});

const createEnrollmentSchema = z.object({
	course: objectId,
});

const updateEnrollmentSchema = z.object({
	learner: objectId.optional(),
	course: objectId.optional(),
	enrolledAt: z.coerce.date().optional(),
	status: z.enum(["active", "completed", "cancelled"]).optional(),
	progress: z.number().min(0).optional(),
}).refine((data) => Object.keys(data).length > 0, {
	message: "At least one field is required",
});

const enrollmentFilterSchema = z.object({
	userId: objectId.optional(),
	course: z.string().optional(),
	status: z.enum(["active", "completed", "cancelled"]).optional(),
});

export { createEnrollmentSchema, updateEnrollmentSchema, enrollmentFilterSchema };
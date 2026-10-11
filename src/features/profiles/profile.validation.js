import z, { ZodString } from "zod"

const updateProfileNameSchema = z.object({
    name: z.string().min(3).max(48).trim().optional(),
})

const updateProfileEmailSchema = z.object({
    email: z.email()
})

const updateAccountPasswordSchema = z.object({
    oldPassword: z.string()
            .min(4)
            .max(64),
    newPassword: z.string()
            .min(4)
            .max(64)
            .regex(/^[A-Za-z0-9]+$/, "Password can only contain letters and numbers")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
    newPasswordConfirmation: z.string()
            .min(4)
            .max(64)
})

export {updateProfileNameSchema, updateProfileEmailSchema, updateAccountPasswordSchema}
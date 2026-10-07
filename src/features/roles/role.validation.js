import { z } from 'zod';
export const createRoleSchema = z.object({
  body: z.object({
    name: z.string({ required_error})
      .min(2)
      .max(50)
      .trim()
  })
});

export const updatePermissionsSchema = z.object({
  body: z.object({
    permissionIds: z.array(z.string(), {
      required_error
    })
  })
});
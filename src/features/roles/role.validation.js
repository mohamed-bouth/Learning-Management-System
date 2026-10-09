import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(2).max(50).trim(),
});

export const updatePermissionsSchema = z.object({
  permissionIds: z.array(z.string()),
});

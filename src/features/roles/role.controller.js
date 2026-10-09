import {
  getAllRoleService,
  getRoleByIdService,
  createRoleService,
  deleteRoleService,
  updateRoleService,
  updateRolePermissionService,
} from "./role.service.js";

import { createRoleSchema, updateRoleSchema, updatePermissionsSchema } from "./role.validation.js"

export async function getAllRoles(req, res, next) {
  try {
    const Roles = await getAllRoleService();

    res.status(200).json({
      status: true,
      data: Roles,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRoleById(req, res, next) {
  try {
    const { id } = req.params;

    const Role = await getRoleByIdService(id);

    res.status(200).json({
      status: true,
      data: Role,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNewRole(req, res, next) {
  try {
    
    const roleData = createRoleSchema.safeParse(req.body)

    if(!roleData.success){
        return next(valid.error)
    }

    const newRole = await createRoleService(req.body);

    res.status(200).json({
      status: true,
      data: newRole,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateRole(req, res, next) {
  try {
    const { id } = req.params;

    const roleData = updateRoleSchema.safeParse(req.body)

    if(!roleData.success){
        return next(valid.error)
    }

    const updateRole = await updateRoleService(id, req.body);

    res.status(200).json({
      status: true,
      data: {
        role: updateRole,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePermissions(req, res, next) {
  try {
    const { id } = req.params;
    const { permissionsIds } = req.body;

    const permissionsData = updatePermissionsSchema.safeParse(req.body)

    if(!permissionsData.success){
        return next(permissionsData.error)
    }

    const update = await updateRolePermissionService(id, permissionsIds);

    res.status(200).json({
      status: true,
      data: update,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(req, res, next) {
  try {
    const { id } = req.params;

    await deleteRoleService(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

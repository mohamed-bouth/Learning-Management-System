import Permission from './permission.module.js';
import Role from "../roles/role.module.js"

export async function getAllPermissionsService() {
    const permissions = await Permission.find().populate('roles')
    return permissions;
}

export async function getPermissionByIdService(id) {
    const permission = await Permission.findById(id).populate('roles')
    return permission;
}
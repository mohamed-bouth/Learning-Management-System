import { deleteRole } from "./role.controller.js";
import Role from "./role.module.js"

export async function getAllRoleService() {
    const roles = await Role.find().populate('permissions');
    return roles;
}

export async function getRoleByIdService(id) {
    const role = await Role.findOne({_id : id}).populate('permissions');
    return role;
}

export async function createRoleService(roleData) {
    const newRole = new Role(roleData);
    const saveRole = await newRole.save();
    return saveRole;
}

export async function updateRoleService(id, body) {
    const updateRole = await Role.findByIdAndUpdate(id, body )
    return updateRole
}

export async function updateRolePermissionService(roleIds,permissionsIds) {
    console.log(permissionsIds)
    const updatedRole = await Role.findByIdAndUpdate(
        roleIds,
        {permissions : permissionsIds},
        {new :  true}
    ).populate('permissions')
    return updatedRole ;
}

export async function deleteRoleService(id) {
    const deletedRole =  await Role.findByIdAndDelete(id);
    if(!deletedRole){
        const error = new Error('Role not found !')
        error.status = 404
        throw error;
    }

    return deletedRole;
}
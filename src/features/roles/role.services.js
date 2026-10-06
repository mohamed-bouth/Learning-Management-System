import Role from "./role.module"

export async function createRole(roleData) {
    const newRole = new Role(roleData);
    const saveRole = await newRole.save();
    return saveRole;
}

export async function getAllRole() {
    const roles = await Role.find().populate('permissions');
    return roles;
}

export async function getRoleById(id) {
    const role = await Role.findById('id').populate('permissions');
}

export async function updateRolePermission(roleIds,permissionIds) {
    const updatedRole = await Role.findByIdAndUpdate(
        roleIds,
        {permissions : permissionIds},
        {new :  true}
    ).populate('permissions')
    return updatedRole ;
}

export async function deleteRole(id) {
    const deletedRole =  await Role.findByIdAndDelete(id);
    return deleteRole;
}
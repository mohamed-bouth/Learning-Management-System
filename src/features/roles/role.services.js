import Role from "./role.module"

export async function createRoleServices(roleData) {
    const newRole = new Role(roleData);
    const saveRole = await newRole.save();
    return saveRole;
}

export async function getAllRoleServices() {
    const roles = await Role.find().populate('permissions');
    return roles;
}

export async function getRoleByIdServices(id) {
    const role = await Role.findById('id').populate('permissions');
    return role;
}

export async function updateRolePermission(roleIds,permissionIds) {
    const updatedRole = await Role.findByIdAndUpdate(
        roleIds,
        {permissions : permissionIds},
        {new :  true}
    ).populate('permissions')
    return updatedRole ;
}

export async function deleteRoleServices(id) {
    const deletedRole =  await Role.findByIdAndDelete(id);
    return deleteRole;
}
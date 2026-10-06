import Permission from './permission.model.js';


export async function getAllPermissions() {
    const permissions = await Permission.find().populate('roles')
    return permissions;
}

export async function getPermissionsById(id) {
    const permission = await Permission.findById(id).populate('roles')
    return permission;
}
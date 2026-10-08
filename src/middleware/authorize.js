import Role from "../features/roles/role.module.js";
import Permission from "../features/permissions/permission.module.js";

export function authorize(permissionName) {
    return async function (req, res, next) {
        try {
            if (!req.user || !req.user.roleId) {
                const error = new Error("Vous devez d'abord vous connecter");
                error.statusCode = 401;
                return next(error);
            }

            const roleId = req.user.roleId;
            let role = await Role.findOne({ _id: roleId });
            let permission = await Permission.findOne({ name: permissionName });
            if (!role || !permission) {
                const error = new Error("Rôle ou permission introuvable");
                error.statusCode = 404;
                return next(error);
            }
            const rolePermissions = role.permissions.map(p => p.toString());

            if (!rolePermissions.includes(permission._id.toString())) {
                const error = new Error("Accès interdit : permission " + permissionName + " requise");
                error.statusCode = 403;
                return next(error);
            }
            return next();

        } catch (error) {
            return next(error);
        }
    };
}
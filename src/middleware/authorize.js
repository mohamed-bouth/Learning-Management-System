import Role from "../features/roles/role.module.js";
import Permission from "../features/permissions/permission.module.js";

function authorize(permissionName) {
    return async function (req, res, next) {
        try {
            if (!req.user || !req.user.roleId) {
                const error = new Error("authentication error !");
                error.name = 'AuthenticationError'
                error.status = 401;
                return next(error);
            }

            const roleId = req.user.roleId;
            let role = await Role.findOne({ _id: roleId });
            let permission = await Permission.findOne({ name: permissionName });
            if (!role || !permission) {
                const error = new Error("Rôle or permission introuvable !");
                error.name = 'AuthorizationError'
                error.status = 500;
                return next(error);
            }
            
            const permissionAttached = role.permissions.find((item) =>
                item.permission.toString() === permission._id.toString()
            );

            if (!permissionAttached) {
                const error = new Error("Access prohibited !");
                error.name = 'AuthorizationError'
                error.status = 403;
                return next(error);
            }

            req.user.permission = permissionAttached;

            return next();

        } catch (error) {
            return next(error);
        }
    };
}

export default authorize
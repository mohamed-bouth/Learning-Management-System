import { getAllPermissionsService, getPermissionByIdService } from "./permission.service.js";


export async function getPermissions(req, res, next) {
    try{

        const permissions = await getAllPermissionsService();
        res.status(200).json({status: 'success' , data : {permissions}});
    }catch(error){
        next(error);
    }
}
export async function getPermissionById(req, res, next) {
    try{
        const { id } = req.params;
        const permission = await getPermissionByIdService(id);

        res.status(200).json({status : 'success' , data : {permission}})
      }catch(error){
        next(error)
    }
}
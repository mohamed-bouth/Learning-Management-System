import { getAllRoleServices , getRoleByIdServices , createRoleServices , deleteRoleServices ,updateRoleServices, updateRolePermission } from "./role.service.js";

export async function getAllRoles(req,res,next) {
    try{
        const Roles = await getAllRoleServices();
        res.status(200).json({status :'success',data : Roles})
    }catch(error){
        next(error)
    }
}

export async function getRoleById(req,res,next) {
    try{
        const {id} = req.params;
        const Role = await getRoleByIdServices(id)
        res.status(200).json({status : 'success',data : Role})
    }catch(error){
        next(error)
    }
}

export async function createNewRole(req,res,next) {
    try{
        const newRole = await createRoleServices(req.body);
        res.status(200).json({status : 'succes',data : newRole })
    }catch(error){
        next(error)
    }
}

export async function updateRole(req,res,next) {
    try{
        const {id} = req.params;
        const updateRole = await updateRoleServices(id , req.body);
        res.status(200).json({status : 'succes' , data : {
            role : updateRole
        }})
    }catch(error){
        next(error)
    }
}

export async function updatePermissions(req,res,next) {
    try{
        const {id} = req.params;
        const {permissionsIds} = req.body;
        const update = await updateRolePermission(id,permissionsIds);
        res.status(200).json({status : 'succes' , data :update})
    }catch(error){
        next(error)
    }
}

export async function deleteRole(req,res,next) {
    try{
        const {id} = req.params;
        const deletedRole = await deleteRoleServices(id) ;
        res.status(204).send();
    }catch(error){
        next(error)
    }
    
}
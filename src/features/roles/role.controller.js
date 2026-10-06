import D from "dotenv";
import { getAllRoleServices , getRoleByIdServices , createRoleServices , deleteRoleServices , updateRolePermission } from "./role.services";

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

export async function updatePermissions(req,res,next) {
    try{
        const {id} = req.params;
        const {permissionIds} = req.body;
        const update = await updateRolePermission(id,permissionIds);
        res.status(200).json({status : 'succes' , data :update})
    }catch(error){
        next(error)
    }
}

export async function deleteRole(req,res,next) {
    try{
        const {id} = req.params;
        const deletedRole = await deleteRoleServices(id) ;
        res.status(200).json({status:'succes',data:deletedRole})
    }catch(error){
        next(error)
    }
    
}
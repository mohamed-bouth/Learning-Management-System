import express from 'express';
import {getAllRoles , getRoleById , createNewRole , updatePermissions ,updateRole, deleteRole} from './role.controller.js';
import validateObjectId from '../../middleware/validateObjectId.js';
const router = express.Router();
router.get('/', getAllRoles);
router.post('/', createNewRole);
router.get('/:id', validateObjectId, getRoleById);
router.put('/:id/permissions', validateObjectId, updatePermissions);
router.put('/:id',validateObjectId,updateRole);
router.delete('/:id', validateObjectId, deleteRole);

export default router;
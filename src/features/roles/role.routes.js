import express from 'express';
import { getAllRoles, getRoleById, createNewRole, updatePermissions, updateRole, deleteRole } from './role.controller.js';

import validateObjectId from '../../middleware/validateObjectId.js';
import { validate } from '../../middleware/validate.js';
import { createRoleSchema, updatePermissionsSchema } from './role.validation.js';

const router = express.Router();

router.get('/', getAllRoles);
router.post('/', validate(createRoleSchema), createNewRole);
router.get('/:id', validateObjectId, getRoleById);
router.put('/:id/permissions', validateObjectId, validate(updatePermissionsSchema), updatePermissions);
router.put('/:id', validateObjectId, validate(createRoleSchema), updateRole);
router.delete('/:id', validateObjectId, deleteRole);

export default router;
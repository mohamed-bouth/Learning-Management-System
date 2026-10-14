import express from "express";
import { getAllRoles, getRoleById, createNewRole, updatePermissions, updateRole, deleteRole } from "./role.controller.js";

import validateObjectId from "../../middleware/validateObjectId.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";


const router = express.Router();

router.get("/", authenticate, authorize("roles:get"), getAllRoles);
router.post("/", authenticate, authorize("role:create"), createNewRole);
router.get("/:id", authenticate, authorize("role:get"), validateObjectId, getRoleById);
router.put("/:id/permissions", authenticate, authorize("permissions:set"), validateObjectId, updatePermissions);
router.put("/:id", authenticate, authorize("role:update"), validateObjectId, updateRole);
router.delete("/:id", authenticate, authorize("role:delete"), validateObjectId, deleteRole);

export default router;

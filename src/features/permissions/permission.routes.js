import express from "express";
import { getPermissions, getPermissionById } from "./permission.controller.js";
import validateObjectId from "../../middleware/validateObjectId.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

router.get("/", authenticate, authorize("permissions:get"), getPermissions);
router.get("/:id", authenticate, authorize("permissions:get"), validateObjectId, getPermissionById);

export default router;

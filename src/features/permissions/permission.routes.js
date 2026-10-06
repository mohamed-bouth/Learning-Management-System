import express from "express"
import { getPermissions,getPermissionById } from "./permission.controller.js"
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router()

router.get('/', getPermissions);
router.get('/:id' ,validateObjectId,  getPermissionById)

export default router

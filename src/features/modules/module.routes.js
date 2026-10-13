import express from "express"
import {
    getOneWithResources,
    getModules,
    createModule,
    updateModule,
    reorderModules,
    getModulesByCourse,
    deleteModule
} from "./module.controller.js"

import authenticate from "../../middleware/authenticate.js"
import authorize from "../../middleware/authorize.js"

const router = express.Router()

router.get("/", authenticate, authorize("module:read"), getModules)
router.get("/course/:id", authenticate, authorize("module:read"), getModulesByCourse);
router.get('/:id/resources' , authenticate, authorize("module:read") , getOneWithResources)
router.post("/", authenticate, authorize("module:create"), createModule);
router.put('/:id', authenticate, authorize("module:update"),updateModule)
router.patch("/reorder", authenticate, authorize("module:update"), reorderModules);
router.delete("/:id", authenticate, authorize("module:delete"), deleteModule)

export default router

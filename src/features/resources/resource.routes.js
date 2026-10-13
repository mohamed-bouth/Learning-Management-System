import express from "express";
import { getAll, getOne, create, update, remove } from "./resource.controller.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", authenticate, authorize("resource:read"), getAll);
router.get("/:id", authenticate, authorize("resource:read"), validateObjectId, getOne);
router.post("/", authenticate, authorize("resource:create"), create);
router.put("/:id", authenticate, authorize("resource:update"), validateObjectId, update);
router.delete("/:id", authenticate, authorize("resource:delete"), validateObjectId, remove);

export default router;

import express from "express";
import { getAll, getOne, create, update, remove } from "./enrollment.controller.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", authenticate, authorize("enrollment:read"), getAll);
router.get("/:id", authenticate, authorize("enrollment:read"), validateObjectId, getOne);
router.post("/", authenticate, authorize("enrollment:create"), create);
router.put("/:id", authenticate, authorize("enrollment:update"), validateObjectId, update);
router.delete("/:id", authenticate, authorize("enrollment:delete"), validateObjectId, remove);

export default router;

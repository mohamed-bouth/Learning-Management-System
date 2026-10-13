import express from "express";
import { getAll, getOne, create, update, remove } from "./resource.controller.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validateObjectId from "../../middleware/validateObjectId.js";
import upload from "../../middleware/upload.js";
import validateFile from "../../middleware/validateFile.js";

const router = express.Router();

router.get("/", authenticate, authorize("resource:read"), getAll);
router.get("/:id", authenticate, authorize("resource:read"), validateObjectId, getOne);
router.post("/", authenticate, authorize("resource:create"), upload.single("file"), validateFile(), create);
router.put("/:id", authenticate, authorize("resource:update"), upload.single("file"), validateFile(), validateObjectId, update);
router.delete("/:id", authenticate, authorize("resource:delete"), validateObjectId, remove);

export default router;

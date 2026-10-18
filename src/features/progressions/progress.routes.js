import express from "express";
import { complete, getCourseProgressions, getCourseProgressionsById } from "./progress.controller.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router();

router.patch("/:id/complete", authenticate, authorize("progression:complete"), validateObjectId, complete );
router.get("/courses", authenticate, authorize("progression:read"), getCourseProgressions)
router.get("/:id/course", authenticate, authorize("progression:read"), validateObjectId, getCourseProgressionsById)

export default router;

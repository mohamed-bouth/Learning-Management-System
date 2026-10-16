import express from "express";
import { complete } from "./progress.controller.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router();

router.patch("/:id/complete", authenticate, authorize("progression:complete"), validateObjectId, complete );

export default router;

import express from "express";
import {
  getAll,
  getOne,
  getOneWithModules,
  create,
  update,
  remove,
} from "./course.controller.js";
import validateObjectId from "../../middleware/validateObjectId.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js"

const router = express.Router();

router.get("/", getAll);
router.get("/:id", authenticate, authorize("course:get"), validateObjectId, getOne);
router.get("/:id/modules", authenticate, authorize("course:modules"), validateObjectId, getOneWithModules);
router.post("/", authenticate, authorize("course:create"), create);
router.put("/:id", authenticate, authorize("course:update"), validateObjectId, update);
router.delete("/:id", authenticate, authorize("course:delete"), validateObjectId, remove);

export default router;

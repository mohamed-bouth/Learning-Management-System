import express from "express";
import {
    getAll,
    getOne,
    create,
    update,
    remove,
} from "./category.controller.js";
import validateObjectId from "../../middleware/validateObjectId.js";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

router.get('/',authenticate, authorize('category:get'), getAll)
router.get('/:id',authenticate, authorize('category:get'), validateObjectId, getOne)
router.post('/',authenticate, authorize('category:create'), create)
router.put('/:id',authenticate, authorize('category:update'), validateObjectId, update)
router.delete('/:id',authenticate, authorize('category:delete'), validateObjectId, remove)

export default router;

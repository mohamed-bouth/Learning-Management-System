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

const router = express.Router();

router.get('/', getAll);
router.get('/:id', validateObjectId, getOne);
router.get('/:id/modules' , validateObjectId, getOneWithModules);
router.post('/', create);
router.put('/:id', validateObjectId, update);
router.delete('/:id', validateObjectId, remove);

export default router;

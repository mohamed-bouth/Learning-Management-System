import express from "express";
import {
	getAll,
	getOne,
	create,
	update,
	remove,
} from "./course.controller.js";
import validateObjectId from "../../middleware/validateObjectId.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:id', validateObjectId, getOne);
router.post('/', create);
router.put('/:id', validateObjectId, update);
router.delete('/:id', validateObjectId, remove);

export default router;

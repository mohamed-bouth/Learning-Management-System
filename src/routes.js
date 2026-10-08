import express from "express";
import authRouter from "./features/auth/auth.routes.js"
import categoriesRouter from "./features/categories/category.routes.js";
import coursesRouter from "./features/courses/course.routes.js";
import moudulesRouter from "./features/modules/module.routes.js";

const router = express.Router();

router.get("/ping", (_,res) => {res.json({success : true , message : "pong"})})

router.use("/auth", authRouter)
router.use("/categories", categoriesRouter);
router.use("/courses", coursesRouter);
router.use("/modules", moudulesRouter)

export default router;

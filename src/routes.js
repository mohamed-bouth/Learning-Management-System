import express from "express";
import categoriesRouter from "./features/categories/category.routes.js";

const router = express.Router();

router.get("/ping", (_,res) => {res.json({success : true , message : "pong"})})

router.use("/categories", categoriesRouter);

export default router;

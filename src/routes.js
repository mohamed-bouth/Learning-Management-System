import express from "express";
import authRouter from "./features/auth/auth.routes.js"
import profilesRouter from "./features/profiles/profile.routes.js"
import categoriesRouter from "./features/categories/category.routes.js";
import coursesRouter from "./features/courses/course.routes.js";
import moudulesRouter from "./features/modules/module.routes.js"
import permissionsRouter  from "./features/permissions/permission.routes.js"
import roleRouter from "./features/roles/role.routes.js"
import resourcesRouter from "./features/resources/resource.routes.js"
import enrollmentsRouter from "./features/enrollments/enrollment.routes.js"
import progressionsRouter from "./features/progressions/progress.routes.js"

const router = express.Router();

router.get("/ping", (_,res) => {res.json({success : true , message : "pong"})})

router.use("/auth", authRouter)
router.use("/profiles", profilesRouter)
router.use("/categories", categoriesRouter);
router.use("/courses", coursesRouter);
router.use("/modules", moudulesRouter)
router.use("/permissions", permissionsRouter);
router.use("/roles",roleRouter)
router.use("/resources", resourcesRouter)
router.use("/enrollments", enrollmentsRouter)
router.use("/progressions", progressionsRouter)


export default router;

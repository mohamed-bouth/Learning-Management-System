import express from "express"
import authenticate from "../../middleware/authenticate.js"
import { getProfileInfo, updateAccountPassword, updateProfileEmail, updateProfileName } from "./profile.controller.js"

const router = express.Router()

router.get("/me", authenticate, getProfileInfo)
router.patch("/me/name", authenticate, updateProfileName)
router.patch("/me/email", authenticate, updateProfileEmail)
router.post("/me/password", authenticate, updateAccountPassword)

export default router
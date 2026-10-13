import express from "express"
import authenticate from "../../middleware/authenticate.js"
import { getProfileInfo, updateAccountPassword, updateProfileEmail, updateProfileImage, updateProfileName } from "./profile.controller.js"
import upload from "../../middleware/upload.js"
import  validateFile  from "../../middleware/validateFile.js"

const router = express.Router()

router.get("/me", authenticate, getProfileInfo)
router.patch("/me/name", authenticate, updateProfileName)
router.patch("/me/email", authenticate, updateProfileEmail)
router.patch("/me/image", authenticate, upload.single("profileImage"), validateFile(["image/jpeg", "image/png", "image/webp"]), updateProfileImage)
router.post("/me/password", authenticate, updateAccountPassword)

export default router
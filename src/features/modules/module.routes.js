import express from "express"
import {
    getOneWithResources
} from "./module.controller.js"

const router = express.Router()

router.get('/:id/resources' , getOneWithResources)

export default router

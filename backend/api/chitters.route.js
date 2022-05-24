import express from "express"
import ChittersController from "./chitters.controller.js"

const router = express.Router()

router.route("/").get(ChittersController.apiGetChitters)

export default router
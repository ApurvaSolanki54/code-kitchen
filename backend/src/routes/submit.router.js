import { Router } from "express";
import { submitCode } from "../controller/submitCode.controller.js";
const router=Router()

router.route("/submitCode").post(submitCode)

export default router
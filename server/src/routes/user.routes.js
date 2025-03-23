import {Router} from "express"
import { loginUser, registerUser, logout, verifyAndRefreshTokens } from "../controllers/user.controller.js"
import { authCheck } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(authCheck, logout)
router.route("/refresh-token").post(verifyAndRefreshTokens)

export default router
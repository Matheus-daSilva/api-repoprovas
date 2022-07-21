import express from "express"
import { SignUpController } from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const authRoute = express.Router()

authRoute.post("/sign-up", authMiddleware, SignUpController)

export default authRoute
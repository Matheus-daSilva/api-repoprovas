import express from "express"
import authRoute from "./authRoute.js"

const router = express.Router()

router.use(authRoute)

export default router
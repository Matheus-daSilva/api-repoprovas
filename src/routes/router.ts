import express from "express"
import authRoute from "./authRoute.js"
import testsRouter from "./testsRoute.js"

const router = express.Router()

router.use(authRoute)
router.use(testsRouter)

export default router
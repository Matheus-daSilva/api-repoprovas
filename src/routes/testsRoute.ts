import express from "express"
import { PostTestsController } from "../controllers/testsController.js"
import { testsMiddleware } from "../middlewares/testsMiddleware.js"
import { tokenValidation } from "../middlewares/tokenValidation.js"

const testsRouter = express.Router()

testsRouter.post("/tests", tokenValidation, testsMiddleware, PostTestsController)

export default testsRouter
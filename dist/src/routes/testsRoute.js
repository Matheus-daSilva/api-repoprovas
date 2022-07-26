import express from "express";
import { GetTestsByInstructorController, GetTestsBySubjectController, PostTestsController } from "../controllers/testsController.js";
import { testsMiddleware } from "../middlewares/testsMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
var testsRouter = express.Router();
testsRouter.post("/tests", testsMiddleware, tokenValidation, PostTestsController);
testsRouter.get("/tests/subject", tokenValidation, GetTestsBySubjectController);
testsRouter.get("/tests/instructor", tokenValidation, GetTestsByInstructorController);
export default testsRouter;

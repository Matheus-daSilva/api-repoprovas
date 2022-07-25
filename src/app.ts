import express, { json } from "express"
import "express-async-errors"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routes/router.js"
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js"

dotenv.config()

const app = express()
app.use(json())
app.use(cors())
app.use(router)
app.use(errorHandler)

export default app
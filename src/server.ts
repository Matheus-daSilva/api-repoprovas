import app from "./app.js"
import chalk from "chalk"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 4000
app.listen(port, () => console.log(chalk.green.bold(`The server is runinning on port ${port}`)))
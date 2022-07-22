import { Request, Response, NextFunction } from "express"
import { testsSchema } from "../schemas/testsSchema.js";

export async function testsMiddleware(req: Request, res: Response, next: NextFunction) {
    const infos = req.body
    const validation = testsSchema.validate(infos, { abortEarly: false });

    console.log("no middleware")

    if (validation.error) throw {type: "invalid_input", message: "wrong credentials", number: 422}

    next()
}
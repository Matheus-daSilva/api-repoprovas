import { Request, Response, NextFunction } from "express"
import { testsSchema } from "../schemas/testsSchema.js";

export async function testsMiddleware(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const validation = testsSchema.validate(body, { abortEarly: false });

    if (validation.error) throw {type: "invalid_input", message: "wrong credentials", number: 400}

    next()
}
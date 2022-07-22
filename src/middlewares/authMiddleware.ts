import { Request, Response, NextFunction } from "express"
import { signUpSchema } from "../schemas/authSchema.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const validation = signUpSchema.validate(body, { abortEarly: false });

    if (validation.error) throw {type: "invalid_input", message: "wrong credentials", number: 400}

    next()
}
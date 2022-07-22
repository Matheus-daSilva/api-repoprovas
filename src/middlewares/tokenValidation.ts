import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) throw { type: "no_token", message: "no token provided", number: 422 }
    token = token.replace("Bearer ", "")

    const decoding = jwt.verify(token, process.env.JWT_KEY)

    if (!decoding) throw { type: "invalid_input", message: "token invalid", number: 422 }

    next()
}

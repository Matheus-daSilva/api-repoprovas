import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) throw { type: "no_token", message: "no token provided", number: 401 }

    next()
}

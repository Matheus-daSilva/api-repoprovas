import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { signUpService } from "../service/authService.js"

export async function SignUpController(req: Request, res: Response){
    const { email, password } = req.body
    await signUpService(email, password)

}

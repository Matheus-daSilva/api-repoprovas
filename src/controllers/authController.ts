import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { signInService, signUpService } from "../service/authService.js"

export async function SignUpController(req: Request, res: Response){
    const { email, password, passwordConfirmation } = req.body
    await signUpService(email, password, passwordConfirmation)
    return res.status(201).send("created")
}

export async function SignInController(req: Request, res: Response) {
    const { email, password } = req.body
    const respo = await signInService(email, password)
    console.log(respo)
    return res.status(201).send(respo)
}

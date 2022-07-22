import { insertUser, verifyUser } from "../repositories/authRepository.js";
import bcrypt from "bcrypt"
import tokenProvider from "../utils/tokenProvider.js";


export async function signUpService(email: string, password: string, passwordConfirmation: string) {
    const respo = await verifyUser(email)
    if (respo) throw { type: "conflict", message: "this email adress has already exist", number: 409}

    if (passwordConfirmation !== password) throw {type: "invalid_input", message: "invalid password confirmation", number: 400}

    const passwordHashed = bcrypt.hashSync(password, 10)

    return await insertUser({email, password: passwordHashed})
}

export async function signInService(email: string, password: string) {
    const respo = await verifyUser(email)
    if(!respo) throw { type: "not_found", message: "this user does not exist", number: 404 }
    if(!bcrypt.compareSync(password, respo.password)) throw { type: "invalid_password", message: "wrong password", number: 422}
    const respoToken = tokenProvider(email)
    return respoToken
}
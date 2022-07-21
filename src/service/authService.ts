import { Users } from "@prisma/client";
import { insertUser, verifyUser } from "../repositories/authRepository.js";
import bcrypt from "bcrypt"


export type UserData = Omit<Users, "id" | "createdAt">

export async function signUpService(email: string, password: string) {
    const respo = await verifyUser(email)
    if (respo) throw { type: "conflict", message: "this email adress has already exist" }

    const passwordHashed = bcrypt.hashSync(password, 10)

    const userInfos = {
        email,
        password: passwordHashed
    }

    return await insertUser(userInfos)
}
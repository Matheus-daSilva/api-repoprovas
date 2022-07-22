import prisma from "../config/database.js";
import { User } from "@prisma/client";

export type UserData = Omit<User, "id" | "createdAt">

export async function verifyUser(email: string) {
    return await prisma.user.findUnique({
        where: {email}
    })
}

export async function insertUser(userInfos: UserData){
    return await prisma.user.create({
        data: userInfos
    })
}
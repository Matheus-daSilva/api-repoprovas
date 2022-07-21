import prisma from "../config/database.js";
import { Users } from "@prisma/client";

export type UserData = Omit<Users, "id" | "createdAt">

export async function verifyUser(email: string) {
    return await prisma.users.findUnique({
        where: {email}
    })
}

export async function insertUser(userInfos: UserData){
    return await prisma.users.create({
        data: userInfos
    })
}
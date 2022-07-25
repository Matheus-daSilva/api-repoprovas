import prisma from "../../src/config/database"
import bcrypt from "bcrypt"

interface UserInfos{
    email: string;
    password: string;
    passwordConfirmation: string;
}

export async function createUserFactory(userInfos: UserInfos) {
    const passwordHashed = bcrypt.hashSync(userInfos.password, 10)
    const infos = {
        email: userInfos.email,
        password: passwordHashed
    }

    return await prisma.user.create({ data: infos })
}

export async function insertUserFactory(email: string, password: string) {
    const passwordHashed = bcrypt.hashSync(password, 10)
    const infos = {
        email,
        password: passwordHashed
    }

    return await prisma.user.create({ data: infos })
}

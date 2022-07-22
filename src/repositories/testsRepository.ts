import { Tests } from "@prisma/client";
import prisma from "../config/database.js";

export type TestData = Omit<Tests, "id" | "createdAt">

export async function postTest(testInfos: TestData) {
    return await prisma.tests.create({
        data: testInfos
    })
}
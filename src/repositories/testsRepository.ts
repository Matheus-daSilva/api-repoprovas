import { Test, Term } from "@prisma/client";
import prisma from "../config/database.js";

export type TestData = Omit<Test, "id" | "createdAt">

export async function postTest(testInfos: TestData) {
    return await prisma.test.create({
        data: testInfos
    })
}

export async function getTestsBySubjectRepository() {
    return await prisma.term.findMany({
        select: {
            id: true, 
            number: true,
            disciplines: {select: {
                id: true,
                name: true,
                teachersDisciplines: {select: {
                    id: true,
                    teacherId: true,
                    disciplineId: true,
                    teachers: {select: {
                        id: true,
                        name: true
                    }},
                    tests: {select: {
                        id: true,
                        name: true,
                        pdfUrl: true,
                        categoryId: true,
                        teacherDisciplineId: true,
                        category: {select: {
                            id: true,
                            name: true
                        }}
                    }}

                }}
            }}
        }
    })
}

export async function getTestsByInstructorRepository() {
    return await prisma.teacher.findMany({
        select: {
            id: true, 
            name: true,
            teachersDisciplines: {select: {
                id: true,
                teacherId: true,
                disciplineId: true,
                disciplines: {select: {
                    id: true,
                    name: true,
                    termId: true,
                    terms: {select: {
                        id: true,
                        number: true
                    }}
            }},
                tests: {select: {
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDisciplineId: true,
                    categoryId: true,
                    category: {select: {
                        id: true,
                        name: true,
                    }}
                }}
            }}
        }
    })
}
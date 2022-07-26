import { Test } from "@prisma/client";
import { getTestsByInstructorRepository, getTestsBySubjectRepository, postTest, TestData, validateCategory, validateTeacher, validateTeacherDiscipline } from "../repositories/testsRepository.js";

export type TestIds = Omit<Test, "id" | "name" | "pdfUrl">


export async function postTestsService(testsInfos: TestData){
    await checkIds({
        categoryId: testsInfos.categoryId,
        teacherDisciplineId: testsInfos.teacherDisciplineId,
        teacherId: testsInfos.teacherId
    })
    return await postTest(testsInfos)
}

export async function checkIds(ids: TestIds) {
    const respo1 = await validateTeacherDiscipline(Number(ids.teacherDisciplineId))
    const respo2 = await validateCategory(Number(ids.categoryId))
    const respo3 = await validateTeacher(Number(ids.teacherId))
    
    if (!respo1) throw {type: "not_found", message: "this discipline does not exist", number: 422}
    
    if (!respo2) throw {type: "not_found", message: "this category does not exist", number: 422}
    
    if (!respo3) throw {type: "not_found", message: "this teacher is not registered", number: 422}
    
    if (respo1.teacherId !== ids.teacherId) throw {type: "unauthorized", message: "This discipline is not ministered by this teacher", number: 401}
}

export async function getTestsBySubjectService() {
    const respo = await getTestsBySubjectRepository()
    if (!respo) throw {type: "not_found", message: "there are no tests", number: 422}
    return respo
}

export async function getTestsByInstructorService() {
    const respo = await getTestsByInstructorRepository()
    if (!respo) throw {type: "not_found", message: "there are no tests", number: 422}
    return respo
}
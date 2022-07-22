import { getTestsBySubjectRepository, postTest, TestData } from "../repositories/testsRepository.js";


export async function postTestsService(testsInfos: TestData){
    return await postTest(testsInfos)
}

export async function getTestsBySubjectService() {
    const respo = await getTestsBySubjectRepository()
    if (!respo) throw {type: "not_found", message: "there are no tests", number: 422}
    return respo
}
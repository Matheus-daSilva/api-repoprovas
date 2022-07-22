import { postTest, TestData } from "../repositories/testsRepository.js";


export async function postTestsService(testsInfos: TestData){
    return await postTest(testsInfos)
}
import { Request, Response } from "express"
import { getTestsByInstructorService, getTestsBySubjectService, postTestsService } from "../service/testsService.js"

export async function PostTestsController(req: Request, res: Response){
    const infos = req.body
    await postTestsService(infos)
    return res.status(201).send("created")
}

export async function GetTestsBySubjectController(req: Request, res: Response){
    const respo = await getTestsBySubjectService()
    return res.status(200).send(respo)
}

export async function GetTestsByInstructorController(req: Request, res: Response) {
    const respo = await getTestsByInstructorService()
    return res.status(200).send(respo)
}

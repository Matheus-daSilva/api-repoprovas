import { Request, Response } from "express"
import { postTestsService } from "../service/testsService"

export async function PostTestsController(req: Request, res: Response){
    const { body } = req
    await postTestsService(body)
    return res.status(201).send("created")
}

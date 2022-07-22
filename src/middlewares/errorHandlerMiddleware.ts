import { Response, Request, NextFunction} from "express";

interface CustomErrors {
    type: string;
    message: string;
    number: number;
}

export async function errorHandler(error: CustomErrors, req: Request, res: Response, next: NextFunction){

    if (error.type) {
        return res.status(Number(error.number)).send(error.message)
    }

    return res.status(500).send("Internal server error")
}
import { Request, Response, NextFunction } from "express";

const validQuestion = async (req: Request, res: Response, next: NextFunction) => {

    const { answer, question } = req.body
    
    if(!question || !answer) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    next()

}

export default validQuestion
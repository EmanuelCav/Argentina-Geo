import { Request, Response, NextFunction } from "express";

const validQuestion = async (req: Request, res: Response, next: NextFunction) => {

    const { answer, category, question } = req.body
    
    if(!question || !category || !answer) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    next()

}

export default validQuestion
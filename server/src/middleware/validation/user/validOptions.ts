import { Request, Response, NextFunction } from "express";

const validOptions = (req: Request, res: Response, next: NextFunction) => {

    const { amountOptions, amountQuestions } = req.body

    if(!amountOptions || !amountQuestions) {
        return res.status(400).json({ message: "You have to complete the options" })
    }
    
    next()

}

export default validOptions
import { Request, Response, NextFunction } from "express";

const validLevel = (req: Request, res: Response, next: NextFunction) => {

    const { level, max } = req.body

    const numbers = /^[0-9]*$/

    if(!level || !max) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    if(!numbers.test(level) || !numbers.test(max)) {
        return res.status(400).json({ message: "You must only write numbers" })
    }

}

export default validLevel
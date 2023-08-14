import { Request, Response, NextFunction } from "express";

const validCategory = (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.body

    if(!name) {
        return res.status(400).json({ message: "Name's field is empty" })
    }

    next()

}

export default validCategory
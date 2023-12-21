import { Request, Response, NextFunction } from "express";

const validLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { nickname, password } = req.body

    if(!nickname || !password) {
        return res.status(400).json({ message: "Hay campos vacios" })
    }

    next()

}

export default validLogin
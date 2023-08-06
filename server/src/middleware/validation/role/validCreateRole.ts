import { Request, Response, NextFunction } from "express";

const validCreateRole = (req: Request, res: Response, next: NextFunction) => {

    const { role } = req.body

    const text = /^[a-zA-Z]+$/

    if(!role) {
        return res.status(400).json({ message: "You have to write a role" })
    }

    const isRoleValid = text.test(role)

    if(!isRoleValid) {
        return res.status(401).json({ message: "Only characters are allowed" })
    }

    next()

}

export default validCreateRole
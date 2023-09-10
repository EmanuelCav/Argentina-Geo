import { Request, Response, NextFunction } from "express";

const validPassword = async (req: Request, res: Response, next: NextFunction) => {

    const { password } = req.body

    const characters = /^[0-9a-zA-Z]+$/

    if(password.length < 5) {
        return res.status(400).json({ message: "El código de entrada debe contener al menos 5 caracteres" })
    }

    if(!characters.test(password)) {
        return res.status(400).json({ message: "El código de entrada debe contener unicamente letras y números" })
    }

    next()

}

export default validPassword
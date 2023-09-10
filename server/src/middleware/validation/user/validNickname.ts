import { Request, Response, NextFunction } from "express";

const validNickname = async (req: Request, res: Response, next: NextFunction) => {

    const { nickname } = req.body

    const characters = /^[0-9a-zA-Z]+$/

    if(nickname.length < 3) {
        return res.status(400).json({ message: "El mombre de usuario debe contener al menos 3 caracteres" })
    }

    if(!characters.test(nickname)) {
        return res.status(400).json({ message: "El mombre de usuario debe contener unicamente letras y números" })
    }

    next()

}

export default validNickname
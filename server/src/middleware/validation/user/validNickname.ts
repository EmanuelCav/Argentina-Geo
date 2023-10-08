import { Request, Response, NextFunction } from "express";

import User from '../../../database/models/users';

const validNickname = async (req: Request, res: Response, next: NextFunction) => {

    const { nickname } = req.body

    const characters = /^[0-9a-zA-Z]+$/

    const isNickname = await User.findOne({ nickname })

    if(isNickname?.id != req.user) {
        if(isNickname) {
            return res.status(400).json({ message: "Ya existe un usuario con este nombre" })
        }
    }

    if(nickname.length < 3) {
        return res.status(400).json({ message: "El mombre de usuario debe contener al menos 3 caracteres" })
    }

    if(!characters.test(nickname)) {
        return res.status(400).json({ message: "El mombre de usuario debe contener unicamente letras y números" })
    }

    next()

}

export default validNickname
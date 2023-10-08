import { Request, Response, NextFunction } from "express";

import { comparePassword } from '../../../helper/encrypt';

import User from '../../../database/models/users';

const validLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { nickname, password } = req.body

    if(!nickname || !password) {
        return res.status(400).json({ message: "Hay campos vacios" })
    }

    const user = await User.findOne({ nickname })

    if(!user) {
        return res.status(400).json({ message: "Los campos no coinciden" })
    }

    next()

}

export default validLogin
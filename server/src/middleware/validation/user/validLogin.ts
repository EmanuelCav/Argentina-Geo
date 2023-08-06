import { Request, Response, NextFunction } from "express";

import { comparePassword } from '../../../helper/encrypt';

import User from '../../../database/models/users';

const validLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { nickname, password } = req.body

    if(!nickname || !password) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    const user = await User.findOne({ nickname })

    if(!user) {
        return res.status(400).json({ message: "Nickname does not exists or fields do not match" })
    }

    const passwordMatched = await comparePassword(password, user.password)

    if(!passwordMatched) {
        return res.status(400).json({ message: "Nickname does not exists or fields do not match" })
    }

    next()

}

export default validLogin
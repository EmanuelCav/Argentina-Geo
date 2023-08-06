import { Request, Response, NextFunction } from "express";

import User from '../../../database/models/users';

const ValidCreateUser = async (req: Request, res: Response, next: NextFunction) => {

    const validPhone = /^[0-9]+$/
    const validNickname = /^[a-zA-Z0-9]+$/

    const { nickname, phone, role, password, confirm } = req.body

    if(!nickname || !phone || !role || !password || !confirm) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    if(password.length < 10) {
        return res.status(400).json({ message: "Password must have at least 10 characters" })
    }

    if(password !== confirm) {
        return res.status(400).json({ message: "Passwords do not match" })
    }

    if(!validPhone.test(phone)) {
        return res.status(401).json({ message: "Phone is not valid, Only characters are allowed" })
    }

    if(!validNickname.test(nickname)) {
        return res.status(401).json({ message: "Nickame is not valid. Only characters and numbers are allowed" })
    }

    const nicknameExists = await User.findOne({ nickname })

    if(nicknameExists) {
        return res.status(400).json({ message: "Nickname already exists" })
    }

    next()

}

export default ValidCreateUser
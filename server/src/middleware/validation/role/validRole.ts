import { Request, Response, NextFunction } from "express";

import User from '../../../database/models/users';

const validRole = async (req: Request, res: Response, next: NextFunction) => {

    const user = await User.findById(req.user).populate("role").select("-password")

    if(!user) {
        return res.status(400).json({ message: "User does not exists" })
    }

    if(user.role.role !== 'Admin') {
        return res.status(400).json({ message: "You cannot do this action" })
    }

    next()

}

export default validRole
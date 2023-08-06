import { Request, Response, NextFunction } from "express";

import Role from '../../../database/models/roles';

const validRole = async (req: Request, res: Response, next: NextFunction) => {

    const roles = await Role.find()

    let isAllowed = false

    for (let i = 0; i < roles.length; i++) {
        if(roles[i].role === 'Admin') {
            isAllowed = true
            break;
        }
    }

    if(!isAllowed) {
        return res.status(401).json({ message: "You cannot do this action" })
    }

    next()

}

export default validRole
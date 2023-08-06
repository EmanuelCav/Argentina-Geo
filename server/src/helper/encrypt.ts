import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ObjectId } from "mongoose";

import { jwToken } from "../config/config";

export const hashPassword = async (password: string): Promise<string> => {

    const salt: string = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)

}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export const generateToken = (id: ObjectId) => {
    const token = jwt.sign({ id }, `${jwToken}`, {
        expiresIn: '30d'
    })

    return token
}
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ObjectId } from "mongoose";

import { jwToken } from "../config/config";
import { shuffle } from './functions';

export const hashPassword = async (password: string): Promise<string> => {

    const salt: string = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)

}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}

export const generateToken = (id: ObjectId): string => {
    const token: string = jwt.sign({ id }, `${jwToken}`, {
        expiresIn: '90d'
    })

    return token
}

export const generatePassword = (): string => {

    let numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let password: string = ""

    for (let i = 0; i < 12; i++) {
        let shuffleNumbers: string[] = shuffle(numbers)
        password += shuffleNumbers[0]
    }

    return password

}
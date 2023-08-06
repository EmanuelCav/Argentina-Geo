import { Request, Response } from "express";

import User from '../database/models/users';
import Role from '../database/models/roles';

import { hashPassword } from "../helper/encrypt";

export const users = async (req: Request, res: Response) => {

    try {

        const showUsers = await User.find()

        return res.status(200).json(showUsers)
        
    } catch (error) {
        throw error
    }

}

export const user = async (req: Request, res: Response) => {

    try {

        return res.status(200).json({ message: "user" })
        
    } catch (error) {
        throw error
    }

}

export const createUser = async (req: Request, res: Response) => {

    const { nickname, phone, role, password } = req.body

    try {

        const roleUser = await Role.findOne({ role })

        if(!roleUser) {
            return res.status(400).json({ message: "Role does not exists" })
        }

        const pass = await hashPassword(password)

        const newUser = new User({
            nickname,
            phone,
            role: roleUser._id,
            password: pass
        })

        await newUser.save()

        return res.status(200).json({
            message: "User was created successfully"
        })
        
    } catch (error) {
        throw error
    }

}

export const register = async (req: Request, res: Response) => {

    try {

        return res.status(200).json({ message: "register" })
        
    } catch (error) {
        throw error
    }

}

export const login = async (req: Request, res: Response) => {

    try {

        return res.status(200).json({ message: "login" })
        
    } catch (error) {
        throw error
    }

}

export const removeUser = async (req: Request, res: Response) => {

    try {

        return res.status(200).json({ message: "removeUser" })
        
    } catch (error) {
        throw error
    }

}
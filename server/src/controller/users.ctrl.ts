import { Request, Response } from "express";

import User from '../database/models/users';
import Role from '../database/models/roles';
import Category from '../database/models/category';

import { generateToken, hashPassword } from "../helper/encrypt";

export const users = async (req: Request, res: Response) => {

    try {

        const showUsers = await User.find().select("-password")

        return res.status(200).json({
            users: showUsers,
            length: showUsers.length
        })
        
    } catch (error) {
        throw error
    }

}

export const user = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const showUser = await User.findById(id).select("-password")

        if(!showUser) {
            return res.status(400).json({ message: "User does not exists" })
        }

        return res.status(200).json(showUser)
        
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

    const { nickname, phone, password } = req.body

    try {

        
        const pass = await hashPassword(password)
        
        const role = await Role.findOne({ role: 'Player' })
        
        const newUser = new User({
            nickname,
            phone,
            role: role?._id,
            password: pass
        })

        const userSaved = await newUser.save()
        
        const category = await Category.findOne({ name: 'Capitales' })

        await User.findOneAndUpdate({ nickname }, {
            $push: {
                categories: category?._id
            }
        }, {
            new: true
        })

        const token = generateToken(userSaved._id)

        const user = await User.findById(userSaved._id).select("-password")

        return res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        throw error
    }

}

export const login = async (req: Request, res: Response) => {

    const { nickname } = req.body

    try {

        const user = await User.findOne({ nickname }).select("-password")

        if(!user) {
            return res.status(400).json({ message: "Nickname does not exists or fields do not match" })
        }

        const token = generateToken(user._id)
        
        return res.status(200).json({
            user,
            token
        })
        
    } catch (error) {
        throw error
    }

}

export const removeUser = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const user = await User.findById(id)

        if(!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        await User.findByIdAndDelete(id)

        return res.status(200).json({ message: "User was removed successfully" })
        
    } catch (error) {
        throw error
    }

}
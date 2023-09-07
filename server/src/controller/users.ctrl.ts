import { Request, Response } from "express";

import User from '../database/models/users';
import Role from '../database/models/roles';
import Category from '../database/models/category';
import Categoryuser from '../database/models/categoryUser';
import Pais from '../database/models/pais';
import Level from '../database/models/level';
import Experience from '../database/models/experience';

import { generatePassword, generateToken, hashPassword } from "../helper/encrypt";
import { categoriesFromUser, experienceFromUser } from "../helper/user.functions";

export const users = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showUsers = await User.find()
            .populate("categories")
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")
            .select("nickname level points pais provincia municipio")

        return res.status(200).json(showUsers)

    } catch (error) {
        throw error
    }

}

export const user = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showUser = await User.findById(id)
            .populate("categories")
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")
            .select("nickname level points pais provincia municipio categories")

        if (!showUser) {
            return res.status(400).json({ message: "User does not exists" })
        }

        return res.status(200).json(showUser)

    } catch (error) {
        throw error
    }

}

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    const { nickname, phone, role, password } = req.body

    try {

        const roleUser = await Role.findOne({ role })

        if (!roleUser) {
            return res.status(400).json({ message: "Role does not exists" })
        }

        const country = await Pais.findOne({ name: "Argentina" })

        if (!country) {
            return res.status(401).json({ message: "Country does not exists" })
        }

        const pass = await hashPassword(password)

        const newUser = new User({
            nickname,
            phone,
            role: roleUser._id,
            password: pass,
            pais: country._id
        })

        const userSaved = await newUser.save()

        await categoriesFromUser(userSaved._id)
        await experienceFromUser(userSaved._id)

        return res.status(200).json({
            message: "User was created successfully"
        })

    } catch (error) {
        throw error
    }

}

export const register = async (req: Request, res: Response): Promise<Response> => {

    const { nickname, phone, password } = req.body

    try {

        const pass = await hashPassword(password)

        const role = await Role.findOne({ role: 'Player' })

        const country = await Pais.findOne({ name: "Argentina" })

        const level = await Level.findOne({ level: 1 })

        if (!country) {
            return res.status(401).json({ message: "Country does not exists" })
        }

        const newUser = new User({
            nickname,
            phone,
            role: role?._id,
            password: pass,
            pais: country._id,
            level
        })

        const userSaved = await newUser.save()

        await categoriesFromUser(userSaved._id)
        await experienceFromUser(userSaved._id)

        const token = generateToken(userSaved._id)

        const user = await User.findById(userSaved._id).populate("categories").select("-password")

        return res.status(200).json({
            user,
            token
        })

    } catch (error) {
        throw error
    }

}

export const login = async (req: Request, res: Response): Promise<Response> => {

    const { nickname } = req.body

    try {

        const user = await User.findOne({ nickname })
            .populate("categories")
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        if (!user) {
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

export const firstTime = async (req: Request, res: Response): Promise<Response> => {

    try {

        const users = await User.find()

        const country = await Pais.findOne({ name: "Argentina" })

        const role = await Role.findOne({ role: 'Player' })

        const level = await Level.findOne({ level: 1 })

        const categories = await Category.find()

        if (!country) {
            return res.status(401).json({ message: "Country does not exists" })
        }

        const pass = generatePassword()
        
        const newUser = new User({
            nickname: `usuario${users.length + 1}`,
            password: pass,
            role: role?._id,
            pais: country._id,
            level: level?._id
        })
        
        const userSaved = await newUser.save()

        await categoriesFromUser(userSaved._id)

        // for(let i = 0; i < categories.length; i++) {

        //     const categoryUser = new Categoryuser({
        //         category: categories[i]._id,
        //         user: userSaved._id
        //     })

        //     const categoryUserSaved = await categoryUser.save()

        //     await User.findByIdAndUpdate(userSaved._id, {
        //         $push: {
        //             categories: categoryUserSaved._id
        //         }
        //     }, {
        //         new: true
        //     })
        // }

        await experienceFromUser(userSaved._id)

        // const newExperience = new Experience({
        //     user: userSaved._id
        // })

        // const experienceSaved = await newExperience.save()

        // await User.findByIdAndUpdate(userSaved._id, {
        //     points: experienceSaved._id
        // }, {
        //     new: true
        // })

        const token = generateToken(userSaved._id)

        const user = await User.findById(userSaved._id)
            .populate("categories")
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json({
            user: user,
            token
        })

    } catch (error) {
        throw error
    }
}

export const removeUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        await Experience.deleteOne({
            user: id
        })
        await Categoryuser.deleteMany({
            user: id
        })

        await User.findByIdAndDelete(id)

        return res.status(200).json({ message: "User was removed successfully" })

    } catch (error) {
        throw error
    }

}

export const updateOptions = async (req: Request, res: Response): Promise<Response> => {

    const { amountOptions, amountQuestions } = req.body
    const { id } = req.params

    try {

        const user = await User.findById(id)

        if (user?._id != req.user) {
            return res.status(401).json({ message: "You cannot update options" })
        }

        const optionsUpdated = await User.findByIdAndUpdate(id, {
            amountOptions, amountQuestions
        }, {
            new: true
        })
            .populate("categories")
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json(optionsUpdated)

    } catch (error) {
        throw error
    }

}

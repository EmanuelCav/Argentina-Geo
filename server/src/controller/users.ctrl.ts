import { Request, Response, json } from "express";

import User from '../database/models/users';
import Role from '../database/models/roles';
import Categoryuser from '../database/models/categoryUser';
import Pais from '../database/models/pais';
import Provincia from '../database/models/provincia';
import Municipio from '../database/models/municipio';
import Level from '../database/models/level';
import Experience from '../database/models/experience';
import Game from '../database/models/game'
import QuestionGame from '../database/models/questionGame'

import { generatePassword, generateToken, hashPassword } from "../helper/encrypt";
import { categoriesFromUser, experienceFromUser } from "../helper/user.functions";

export const users = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showUsers = await User.find()
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
            .populate({
                path: "categories",
                select: "category questions corrects",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
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
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
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
        await experienceFromUser(userSaved._id)

        const token = generateToken(userSaved._id)

        const user = await User.findById(userSaved._id)
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
            .populate("pais", "name")
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
        await Game.deleteMany({
            user: id
        })
        await QuestionGame.deleteMany({
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
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
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

export const updatePassword = async (req: Request, res: Response): Promise<Response> => {

    const { password } = req.body
    const { id } = req.params

    try {

        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        if (user._id != req.user) {
            return res.status(401).json({ message: "You cannot update the password" })
        }

        const userUpdated = await User.findByIdAndUpdate(id, {
            password
        }, {
            new: true
        })
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}

export const updateNickname = async (req: Request, res: Response): Promise<Response> => {

    const { nickname } = req.body
    const { id } = req.params

    try {

        const user = await User.findById(id)

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        if (user._id != req.user) {
            return res.status(401).json({ message: "You cannot update the nickname" })
        }

        const userUpdated = await User.findByIdAndUpdate(id, {
            nickname
        }, {
            new: true
        })
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const category = await Categoryuser.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (category.user != req.user) {
            return res.status(400).json({ message: "You cannot update this category" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            isSelect: !category.isSelect
        }, {
            new: true
        })

        const user = await User.findById(req.user)
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}

export const updateLocation = async (req: Request, res: Response): Promise<Response> => {

    const { pais, provincia, municipio } = req.body

    try {

        const paisSelected = await Pais.findOne({ name: pais })

        if(!pais) {
            return res.status(400).json({ message: "Pais does not exists" })
        }

        let provinciaSelected;

        if(provincia) {
            provinciaSelected = await Provincia.findOne({ name: provincia })
        }

        let municipioSelected;

        if(municipio) {
            municipioSelected = await Municipio.findOne({ name: municipio })
        }

        const locationUpdated = await User.findByIdAndUpdate(req.user, {
            pais: paisSelected?._id, 
            provincia: provinciaSelected ? provinciaSelected?._id : null,
            municipio: municipioSelected ? municipioSelected?._id : null
        }, {
            new: true
        })
            .populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("level")
            .populate("points")

        return res.status(200).json(locationUpdated)

    } catch (error) {
        throw error
    }

}
import { Request, Response } from "express";

import User from '../database/models/users';
import Role from '../database/models/roles';
import Categoryuser from '../database/models/categoryUser';
import Category from '../database/models/category';
import Pais from '../database/models/pais';
import Provincia from '../database/models/provincia';
import Municipio from '../database/models/municipio';
import Experience from '../database/models/experience';
import Game from '../database/models/game'

import { generatePassword, generateToken, hashPassword, comparePassword } from "../helper/encrypt";
import { categoriesFromUser, experienceFromUser, generateUserNumber } from "../helper/user.functions";

export const users = async (req: Request, res: Response): Promise<Response> => {

    const { date } = req.params

    try {

        const totalUser = await User.aggregate([
            {
                $lookup: {
                    from: Experience.collection.name,
                    localField: 'points',
                    foreignField: '_id',
                    as: 'points'
                }
            },
            {
                $unwind: {
                    path: "$points"
                }
            },
            {
                $sort: {
                    "points.total": -1
                }
            },
            {
                $project: { password: 0 }
            }
        ])

        const dateUser = await User.aggregate([
            {
                $lookup: {
                    from: Experience.collection.name,
                    localField: 'points',
                    foreignField: '_id',
                    as: 'points'
                }
            },
            {
                $unwind: {
                    path: "$points"
                }
            },
            {
                $sort: {
                    [`points.${date}`]: -1
                }
            },
            {
                $match: {
                    [`points.${date}`]: {
                        $gt: 0
                    }
                }
            },
            {
                $limit: 150
            },        
            {
                $project: { password: 0 }
            }
        ])

        return res.status(200).json({
            total: totalUser,
            ranking: dateUser
        })

    } catch (error) {
        throw error
    }

}

export const groupUsers = async (req: Request, res: Response): Promise<Response> => {

    const { location, date } = req.params

    try {

        const countries = await User.aggregate([
            {
                $match: {
                    [`${location}`]: {
                        $ne: null
                    }
                }
            },
            {
                $lookup: {
                    from: location === 'pais' ? location : `${location}s`,
                    localField: location,
                    foreignField: '_id',
                    as: location === 'pais' ? location : `${location}s`
                }
            },
            {
                $lookup: {
                    from: Experience.collection.name,
                    localField: 'points',
                    foreignField: '_id',
                    as: 'points'
                }
            },
            {
                $unwind: {
                    path: "$points"
                }
            },
            {
                $unwind: {
                    path: location === 'pais' ? `$${location}` : `$${location}s`
                }
            },
            {
                $group: {
                    _id: location === 'pais' ? `$${location}.name` : `$${location}s.name`,
                    points: { $sum: `$points.${date}` }
                }
            },
            {
                $match: {
                    "points": {
                        $gt: 0
                    }
                }
            },
        ]).sort({
            "points": -1
        })

        return res.status(200).json(countries)

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

        if (!country) {
            return res.status(401).json({ message: "Country does not exists" })
        }

        const newUser = new User({
            nickname,
            phone,
            role: role?._id,
            password: pass,
            pais: country._id
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

export const getLogin = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const user = await User.findById(id)
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
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "Los campos no coinciden" })
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

export const login = async (req: Request, res: Response): Promise<Response> => {

    const { nickname, password } = req.body

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
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "Los campos no coinciden" })
        }

        // const validation = await comparePassword(password, user.password)

        // if(!validation) {
        //     return res.status(400).json({ message: "Los campos no coinciden" })
        // }

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

        const country = await Pais.findOne({ name: "Argentina" })

        const role = await Role.findOne({ role: 'Player' })

        if (!country) {
            return res.status(401).json({ message: "Country does not exists" })
        }

        const pass = generatePassword()

        const newUser = new User({
            nickname: `usuario${generateUserNumber()}`,
            password: pass,
            role: role?._id,
            pais: country._id
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
            .populate("points")

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params    

    try {

        const category = await Category.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        const categoryUser = await Categoryuser.findOne({ category: category._id, user: req.user })

        if (!categoryUser) {
            return res.status(400).json({ message: "Category user does not exists" })
        }

        if (categoryUser.user != req.user) {
            return res.status(400).json({ message: "You cannot update this category" })
        }
        
        await Categoryuser.findByIdAndUpdate(categoryUser._id, {
            isSelect: !categoryUser.isSelect
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

        if (!pais) {
            return res.status(400).json({ message: "Pais does not exists" })
        }

        let provinciaSelected;

        if (provincia) {
            provinciaSelected = await Provincia.findOne({ name: provincia })
        }

        let municipioSelected;

        if (municipio) {
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
            .populate("points")

        return res.status(200).json(locationUpdated)

    } catch (error) {
        throw error
    }

}

export const updateExperience = async (req: Request, res: Response): Promise<Response> => {

    const { points } = req.body

    try {

        const experience = await Experience.findOne({
            user: req.user
        })

        if (!experience) {
            return res.status(400).json({ message: "Experiece does not exists" })
        }

        await Experience.findByIdAndUpdate(experience._id, {
            bestPuntuation: points > experience.bestPuntuation ? points : experience.bestPuntuation,
            day: experience.day + points,
            month: experience.month + points,
            year: experience.year + points,
            total: experience.total + points,
            lastGame: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString().split("T")[0]
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
            .populate("points")

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}

export const allCategory = async (req: Request, res: Response): Promise<Response> => {

    const { query } = req.body

    try {

        await Categoryuser.updateMany({
            user: req.user,
        }, {
            $set: {
                isSelect: query === "quit" ? false : true
            }
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
            .populate("points")

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}

export const updateHelps = async (req: Request, res: Response): Promise<Response> => {

    const { type } = req.params

    try {

        const user = await User.findById(req.user)

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        const userUpdated = await User.findByIdAndUpdate(req.user, {
            helps: type === 'add' ? user.helps + 2 : user.helps - 1
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
            .populate("points")

        return res.status(200).json(userUpdated)

    } catch (error) {
        throw error
    }

}

export const getDate = async (req: Request, res: Response): Promise<Response> => {

    try {

        const time = new Date(new Date().setHours(new Date().getHours() - 3)).toISOString().split("T")[0].split("-")

        if (time[1] === "01" && time[2] === "01") {

            await Experience.updateMany({
                day: 0,
                month: 0,
                year: 0
            })

            return res.status(200).json({ message: "Year points updated" })

        }

        if (time[2] === "01") {

            await Experience.updateMany({
                day: 0,
                month: 0
            })

            return res.status(200).json({ message: "Month points updated" })

        }

        await await Experience.updateMany({
            day: 0
        })

        return res.status(200).json({ message: "Day points updated" })

    } catch (error) {
        throw error
    }

}
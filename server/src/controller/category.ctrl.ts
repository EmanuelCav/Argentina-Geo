import { Request, Response } from "express";

import Category from '../database/models/category';
import CategoryUser from '../database/models/categoryUser';
import User from '../database/models/users';

export const categories = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showCategories = await Category.find().sort("createdAt")

        return res.status(200).json(showCategories)

    } catch (error) {
        throw error
    }

}

export const createCategories = async (req: Request, res: Response): Promise<Response> => {

    const { name } = req.body

    try {

        const category = await Category.findOne({ name })

        if (category) {
            return res.status(401).json({ message: "Category already exists" })
        }

        const newCategory = new Category({
            name
        })

        await newCategory.save()

        return res.status(200).json({ message: "Category created successfully" })

    } catch (error) {
        throw error
    }

}

export const removeCategories = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const category = await Category.findByIdAndDelete(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        await Category.findByIdAndDelete(id)

        return res.status(200).json({ message: "Category was removed successfully" })

    } catch (error) {
        throw error
    }

}

export const patchCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        await User.findByIdAndUpdate(id, {
            $pull: {
                categories: "65b7e08117f60c32e7e5a443"
            }
        })

        return res.status(200).json("patched")
        
    } catch (error) {
        throw error
    }

}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { name } = req.body

    try {

        const category = await Category.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category updated successfully" })
        }

        await Category.findByIdAndUpdate(id, {
            name
        }, {
            new: true
        })

        return res.status(200).json({ message: "Category updated successfully" })

    } catch (error) {
        throw error
    }

}
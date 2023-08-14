import { Request, Response } from "express";

import Category from '../database/models/category';

export const categories = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showCategories = await Category.find()

        return res.status(200).json(showCategories)
        
    } catch (error) {
        throw error
    }

}

export const createCategories = async (req: Request, res: Response): Promise<Response> => {

    const { name } = req.body

    try {

        const category = await Category.findOne({ name })

        if(category) {
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

        if(!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        await Category.findByIdAndDelete(id)

        return res.status(200).json({ message: "Category was removed successfully" })
        
    } catch (error) {
        throw error
    }

}
import { Request, Response, NextFunction } from "express";

import Category from '../../../database/models/category';

const validQuestion = async (req: Request, res: Response, next: NextFunction) => {

    const { question, category, answer } = req.body

    if(!question || !category || !answer) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    const categoryExists = await Category.findOne({ name: category })

    if(!categoryExists) {
        return res.status(400).json({ message: "The category does not exists" })
    }

    next()

}

export default validQuestion
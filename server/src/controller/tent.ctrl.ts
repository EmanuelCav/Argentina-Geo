import { Request, Response } from 'express';

import Tent from '../database/models/tent';

export const tents = async (req: Request, res: Response): Promise<Response> => {

    try {
        
        const tents = await Tent.find()

        return res.status(200).json(tents)

    } catch (error) {
        throw error
    }

}

export const createTents = async (req: Request, res: Response): Promise<Response> => {

    const { title, description, price, quantity, isAdd } = req.body

    try {

        if(!title || !description || !price || !quantity) {
            return res.status(400).json({ message: "There are empty fields" })
        }

        const newTent = new Tent({
            title,
            description,
            price,
            quantity,
            isAdd: isAdd ? isAdd : false
        })
        
        await newTent.save()

        return res.status(200).json({ message: "Tent created successfully" })

    } catch (error) {
        throw error
    }

}
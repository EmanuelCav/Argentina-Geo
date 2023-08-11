import { Request, Response } from "express";

import Image from '../database/models/image';

export const images = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showImages = await Image.find()

        return res.status(200).json(showImages)
        
    } catch (error) {
        throw error
    }

}

export const removeImage = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const image = await Image.findById(id)

        if(!image) {
            return res.status(400).json({ message: "Image does not exists" })
        }

        await Image.findByIdAndDelete(id)

        return res.status(200).json({ message: "Image was removed suuccessfully" })

    } catch (error) {
        throw error
    }

}

